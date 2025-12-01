import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Domicilio } from '../services/domicilio';
import axios from 'axios';

@Component({
  selector: 'app-domicilio-crear',
  templateUrl: './domicilio-crear.page.html',
  styleUrls: ['./domicilio-crear.page.scss'],
  standalone: false
})
export class DomicilioCrearPage implements OnInit {

  @Input() dom_id: number | undefined;

  baseUrl: string = "http://localhost:8080/domicilios"
  municipioUrl: string = "http://localhost:8080/municipio" /* Peticion para datos de llave foranea */

  public domicilio!: FormGroup;
  municipios: any = []; /* Guardar datos de llave foranea */
  private editarDatos = []; /* Pedir los datos del registro a actualizar para guardarlos aqui */

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private domicilioService: Domicilio
  ) { }

  ngOnInit() {
    this.cargarMunicipios();
    if (this.dom_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'dom_calle': [
      { type: 'required', message: 'Nombre de la calle requerido.' },
    ],
    'dom_numero': [
      { type: 'required', message: 'Numero requerido.' },
    ],
    'dom_cp': [
      { type: 'required', message: 'Codigo Postal requerido.' },
      { type: 'required', message: 'Digite un Codigo Postal valido.' },
    ],
    'dom_fkmun_id': [
      { type: 'required', message: 'Municipio requerido.' },
    ],
  }

  private formulario() {
    this.domicilio = this.formBuilder.group({
      dom_calle: ['', [Validators.required]],
      dom_numero: ['', [Validators.required]],
      dom_cp: ['', [Validators.required, Validators.pattern("^[0-9]{5}$")]],
      dom_fkmun_id: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.domicilio.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  /* Para cargar los datos llave foranea */
  async cargarMunicipios() {
    const response = await axios({
      method: 'get',
      url: this.municipioUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.municipios = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.dom_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.domicilio.get(String(key));
        if (control !== null) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      })
    }).catch(error => {
      console.error('Error al obtener detalles:', error);
    });
  }

  async guardarDatos() {
    try {
      const domicilio = this.domicilio?.value;
      if (this.dom_id === undefined) {
        try {
          await this.domicilioService.crear(domicilio).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.dom_calle, 'El domicilio con nombre ' + response.data.dom_calle + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            error => {
              this.handleError(error, domicilio.dom_calle);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.domicilioService.actualizar(this.dom_id, domicilio).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.dom_calle, 'El domicilio con nombre ' + response.data.dom_calle + ' ha sido actualizado');
              }
            },
            error => {
              this.handleError(error, domicilio.dom_calle);
            }
          );
        } catch (error) {
          console.log(error);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  /** Maneja errores de validación o de servidor */
  private handleError(error: any, nombre: string) {
    if (error?.response?.status == 422) {
      this.alertGuardado(nombre, error?.response?.data[0]?.message, "Error");
    }
    if (error?.response?.status == 500) {
      this.alertGuardado(nombre, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
    }
    console.error('Error en la petición:', error);
  }

  /** Limpia el formulario completamente */
  private resetFormulario() {
    this.domicilio.reset();
    this.domicilio.markAsPristine();
    this.domicilio.markAsUntouched();
  }

  private async alertGuardado(domNombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Domicilio',
      subHeader: subMsg,
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.modalCtrl.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }

}

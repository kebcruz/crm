import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Estado } from '../services/estado';

@Component({
  selector: 'app-estado-crear',
  templateUrl: './estado-crear.page.html',
  styleUrls: ['./estado-crear.page.scss'],
  standalone: false
})
export class EstadoCrearPage implements OnInit {

  @Input() estd_id: number | undefined;

  baseUrl: string = "http://localhost:8080/estados"
  domicilioUrl: string = "http://localhost:8080/pais" /* Peticion para datos de llave foranea */

  public estado!: FormGroup;
  paises: any = []; /* Guardar datos de llave foranea */
  private editarDatos = []; /* Pedir los datos del registro a actualizar para guardarlos aqui */

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private estadoService: Estado
  ) { }

  ngOnInit() {
    this.cargarPaises();
    if (this.estd_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'estd_nombre': [
      { type: 'required', message: 'Nombre del estado requerido.' },
    ],
    'estd_fkpai_id': [
      { type: 'required', message: 'Pais requerido.' },
    ],
  }

  private formulario() {
    this.estado = this.formBuilder.group({
      estd_nombre: ['', [Validators.required]],
      estd_fkpai_id: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.estado.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  /* Para cargar los datos llave foranea */
  async cargarPaises() {
    const response = await axios({
      method: 'get',
      url: this.domicilioUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.paises = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.estd_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.estado.get(String(key));
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
      const estado = this.estado?.value;
      if (this.estd_id === undefined) {
        try {
          await this.estadoService.crear(estado).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.estd_nombre, 'El estado con nombre ' + response.data.estd_nombre + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            error => {
              this.handleError(error, estado.estd_nombre);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.estadoService.actualizar(this.estd_id, estado).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.estd_nombre, 'El estado con nombre ' + response.data.estd_nombre + ' ha sido actualizado');
              }
            },
            error => {
              this.handleError(error, estado.estd_nombre);
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
    this.estado.reset();
    this.estado.markAsPristine();
    this.estado.markAsUntouched();
  }

  private async alertGuardado(estdNombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Estado',
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

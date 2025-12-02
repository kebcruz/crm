import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Etiqueta } from '../services/etiqueta';
import axios from 'axios';

@Component({
  selector: 'app-etiqueta-crear',
  templateUrl: './etiqueta-crear.page.html',
  styleUrls: ['./etiqueta-crear.page.scss'],
  standalone: false
})
export class EtiquetaCrearPage implements OnInit {

  @Input() eti_id: number | undefined;

  baseUrl: string = "http://localhost:8080/etiquetas"
  colorUrl: string = "http://localhost:8080/color" /* Peticion para datos de llave foranea */

  public etiqueta!: FormGroup;
  colores: any = []; /* Guardar datos de llave foranea */
  private editarDatos = []; /* Pedir los datos del registro a actualizar para guardarlos aqui */

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private etiquetaService: Etiqueta
  ) { }

  ngOnInit() {
    this.cargarColores();
    if (this.eti_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'eti_nombre': [
      { type: 'required', message: 'Nombre de etiqueta requerido.' },
    ],
    'eti_fkcol_id': [
      { type: 'required', message: 'Color requerido.' },
    ],
  }

  private formulario() {
    this.etiqueta = this.formBuilder.group({
      eti_nombre: ['', [Validators.required]],
      eti_fkcol_id: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.etiqueta.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  /* Para cargar los datos llave foranea */
  async cargarColores() {
    const response = await axios({
      method: 'get',
      url: this.colorUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.colores = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.eti_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.etiqueta.get(String(key));
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
      const etiqueta = this.etiqueta?.value;
      if (this.eti_id === undefined) {
        try {
          await this.etiquetaService.crear(etiqueta).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.eti_nombre, 'El color de nombre ' + response.data.eti_nombre + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            error => {
              this.handleError(error, etiqueta.eti_nombre);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.etiquetaService.actualizar(this.eti_id, etiqueta).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.eti_nombre, 'El color de nombre ' + response.data.cli_nombre + ' ha sido actualizado');
              }
            },
            error => {
              this.handleError(error, etiqueta.eti_nombre);
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
    this.etiqueta.reset();
    this.etiqueta.markAsPristine();
    this.etiqueta.markAsUntouched();
  }

  private async alertGuardado(cliNombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Etiqueta',
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

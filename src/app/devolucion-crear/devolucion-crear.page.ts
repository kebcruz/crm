import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Devolucion } from '../services/devolucion';
import axios from 'axios';

@Component({
  selector: 'app-devolucion-crear',
  templateUrl: './devolucion-crear.page.html',
  styleUrls: ['./devolucion-crear.page.scss'],
  standalone: false
})
export class DevolucionCrearPage implements OnInit {

  @Input() dev_id: number | undefined;

  baseUrl: string = "http://localhost:8080/devolucions"
  detallesVentaUrl: string = "http://localhost:8080/venta-detalle" /* Peticion para datos de llave foranea */
  estatusVentaUrl: string = "http://localhost:8080/estatu" /* Peticion para datos de llave foranea */

  public devolucion!: FormGroup;
  detalleVenta: any = [];  /* Guardar datos de llave foranea */
  estatuVenta: any = [];  /* Guardar datos de llave foranea */
  private editarDatos = []; /* Pedir los datos del registro a actualizar para guardarlos aqui */

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private devolucionService: Devolucion
  ) { }

  ngOnInit() {
    this.cargarDetallesVenta();
    this.cargarEstatusVenta();
    if (this.dev_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'dev_asunto': [
      { type: 'required', message: 'Asunto requeridos.' },
    ],
    'dev_descripcion': [
      { type: 'required', message: 'Descripcion requerido.' },
    ],
    'dev_fecha_creacion': [
      { type: 'required', message: 'Fecha de creacion requerida.' },
    ],
    'dev_fecha_cierre': [
      { type: 'required', message: 'Fecha de cierre requerida.' },
    ],
    'dev_fkved_id': [
      { type: 'required', message: 'Detalle de venta requerido.' },
    ],
    'dev_fkest_id': [
      { type: 'required', message: 'Estatus de venta requerido.' },
    ],
  }

  private formulario() {
    this.devolucion = this.formBuilder.group({
      dev_asunto: ['', [Validators.required]],
      dev_descripcion: ['', [Validators.required]],
      dev_fecha_creacion: ['', [Validators.required]],
      dev_fecha_cierre: ['', [Validators.required]],
      dev_fkved_id: ['', [Validators.required]],
      dev_fkest_id: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.devolucion.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  /* Para cargar los datos llave foranea */
  async cargarDetallesVenta() {
    const response = await axios({
      method: 'get',
      url: this.detallesVentaUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.detalleVenta = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  /* Para cargar los datos llave foranea */
  async cargarEstatusVenta() {
    const response = await axios({
      method: 'get',
      url: this.estatusVentaUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.estatuVenta = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.dev_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.devolucion.get(String(key));
        if (control !== null) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      })
    }).catch(function (error) {
      console.error('Error al obtener detalles:', error);
    });
  }

  async guardarDatos() {
    try {
      const devolucion = this.devolucion?.value;
      if (this.dev_id === undefined) {
        try {
          await this.devolucionService.crear(devolucion).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.dev_asunto, 'La devolucion de nombre ' + response.data.dev_asunto + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            error => {
              this.handleError(error, devolucion.dev_asunto);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.devolucionService.actualizar(this.dev_id, devolucion).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.dev_asunto, 'La devolucion de nombre ' + response.data.dev_asunto + ' ha sido actualizado');
              }
            },
            error => {
              this.handleError(error, devolucion.dev_asunto);
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
    this.devolucion.reset();
    this.devolucion.markAsPristine();
    this.devolucion.markAsUntouched();
  }

  private async alertGuardado(devAsunto: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Devolucion',
      subHeader: subMsg,
      message: msg,
      cssClass: 'alert-personalizado',
      buttons: [
        {
          text: 'Continuar',
          role: 'confirm',
          cssClass: 'btn-confirmar'
        },
        {
          text: 'Salir',
          role: 'cancel',
          cssClass: 'btn-cancelar',
          handler: () => {
            this.modalCtrl.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }

}

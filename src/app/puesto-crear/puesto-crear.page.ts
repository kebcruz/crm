import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Puesto } from '../services/puesto';
import axios from 'axios';

@Component({
  selector: 'app-puesto-crear',
  templateUrl: './puesto-crear.page.html',
  styleUrls: ['./puesto-crear.page.scss'],
  standalone: false
})
export class PuestoCrearPage implements OnInit {

  @Input() pue_id: number | undefined;

  baseUrl: string = "http://localhost:8080/puestos"

  public puesto!: FormGroup;

  private editarDatos = []; /* Pedir los datos del registro a actualizar para guardarlos aqui */

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private puestoService: Puesto
  ) { }

  ngOnInit() {
    if (this.pue_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'pue_nombre': [
      { type: 'required', message: 'Nombre del puesto requerido.' },
    ],
    'pue_salario': [
      { type: 'required', message: 'Salario requerido.' },
    ],
  }

  private formulario() {
    this.puesto = this.formBuilder.group({
      pue_nombre: ['', [Validators.required]],
      pue_salario: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.puesto.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.pue_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.puesto.get(String(key));
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
      const puesto = this.puesto?.value;
      if (this.pue_id === undefined) {
        try {
          await this.puestoService.crear(puesto).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.pue_nombre, 'El puesto con nombre ' + response.data.pue_nombre + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            error => {
              this.handleError(error, puesto.pue_nombre);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.puestoService.actualizar(this.pue_id, puesto).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.pue_nombre, 'El puesto con nombre ' + response.data.pue_nombre + ' ha sido actualizado');
              }
            },
            error => {
              this.handleError(error, puesto.pue_nombre);
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
    this.puesto.reset();
    this.puesto.markAsPristine();
    this.puesto.markAsUntouched();
  }

  private async alertGuardado(pueNombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Puesto',
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

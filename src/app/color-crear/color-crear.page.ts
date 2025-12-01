import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Color } from '../services/color';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-color-crear',
  templateUrl: './color-crear.page.html',
  styleUrls: ['./color-crear.page.scss'],
  standalone: false
})
export class ColorCrearPage implements OnInit {

  @Input() col_id: number | undefined;

  baseUrl: string = "http://localhost:8080/colors"

  public color!: FormGroup;
  private editarDatos = []; /* Pedir los datos del registro a actualizar para guardarlos aqui */

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private colorService: Color
  ) { }

  ngOnInit() {
    if (this.col_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'col_nombre': [
      { type: 'required', message: 'Nombre del color requerido.' },
    ],
  }

  private formulario() {
    this.color = this.formBuilder.group({
      col_nombre: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.color.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.col_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.color.get(String(key));
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
      const color = this.color?.value;
      if (this.col_id === undefined) {
        try {
          await this.colorService.crear(color).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.col_nombre, 'El color con nombre ' + response.data.col_nombre + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            error => {
              this.handleError(error, color.col_nombre);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.colorService.actualizar(this.col_id, color).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.col_nombre, 'El color con nombre ' + response.data.col_nombre + ' ha sido actualizado');
              }
            },
            error => {
              this.handleError(error, color.col_nombre);
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
    this.color.reset();
    this.color.markAsPristine();
    this.color.markAsUntouched();
  }

  private async alertGuardado(colNombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Color',
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

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Metodo } from '../services/metodo';
import axios from 'axios';

@Component({
  selector: 'app-metodo-crear',
  templateUrl: './metodo-crear.page.html',
  styleUrls: ['./metodo-crear.page.scss'],
  standalone: false
})
export class MetodoCrearPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private metodosService: Metodo
  ) { }

  private editarDatos = [];
  @Input() met_id: number | undefined;
  public metodo!: FormGroup;
  baseUrl: string = "http://localhost:8080/metodos"

  ngOnInit() {
    if (this.met_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'met_nombre': [
      { type: 'required', message: 'Nombre del método de pago.' },
    ],
    'met_descripcion': [
      { type: 'required', message: 'Descripción del método de pago.' },
    ],
  }

  private formulario() {
    this.metodo = this.formBuilder.group({
      met_nombre: ['', [Validators.required]],
      met_descripcion: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.metodo.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.met_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.metodo.get(String(key));
        if (control !== null) {
          control.markAsTouched();
          control.patchValue(this.editarDatos[key]);
        }
      })
    }).catch(function (error) {
      console.log(error);
    });
  }

  async guardarDatos() {
    try {
      const metodo = this.metodo?.value;
      if (this.met_id === undefined) {
        try {
          await this.metodosService.crear(metodo).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.met_nombre, 'El método de pago ' + response.data.met_nombre + ' ha sido registrado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(metodo.met_nombre, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(metodo.met_nombre, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.metodosService.actualizar(this.met_id, metodo).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.met_nombre, 'El método de pago: ' + response.data.met_nombre + ' ha sido actualizado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(metodo.met_nombre, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 401) {
                this.alertGuardado(metodo.met_nombre, error?.response?.data[0]?.message, "No se puede guardar, no tienes credenciales");
              }
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

  private async alertGuardado(nombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Metodo',
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

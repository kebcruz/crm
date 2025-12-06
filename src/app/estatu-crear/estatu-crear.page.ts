import { Component, Input, OnInit } from '@angular/core';
import { Estatu } from '../services/estatu';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-estatu-crear',
  templateUrl: './estatu-crear.page.html',
  styleUrls: ['./estatu-crear.page.scss'],
  standalone: false
})
export class EstatuCrearPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private estatusService: Estatu
  ) { }

  private editarDatos = [];
  @Input() est_id: number | undefined;
  public estatu!: FormGroup;
  baseUrl: string = "http://localhost:8080/estatus"

  ngOnInit() {
    if (this.est_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'est_nombre': [
      { type: 'required', message: 'Nombre requerido.' },
    ],
    'est_descripcion': [
      { type: 'required', message: 'Descripción requerida.' },
    ],
  }

  private formulario() {
    this.estatu = this.formBuilder.group({
      est_nombre: ['', [Validators.required]],
      est_descripcion: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.estatu.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.est_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.estatu.get(String(key));
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
      const estatu = this.estatu?.value;
      if (this.est_id === undefined) {
        try {
          await this.estatusService.crear(estatu).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.est_nombre, 'El estatus ' + response.data.est_nombre + ' ha sido registrado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(estatu.est_nombre, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(estatu.est_nombre, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.estatusService.actualizar(this.est_id, estatu).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.est_nombre, 'El estatus: ' + response.data.est_nombre + ' ha sido actualizado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(estatu.est_nombre, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 401) {
                this.alertGuardado(estatu.est_nombre, error?.response?.data[0]?.message, "No se puede guardar, no tienes credenciales");
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
      header: 'Estatu',
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

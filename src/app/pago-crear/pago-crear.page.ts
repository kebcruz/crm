import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Pago } from '../services/pago';
import { Metodo } from '../services/metodo';
import axios from 'axios';

@Component({
  selector: 'app-pago-crear',
  templateUrl: './pago-crear.page.html',
  styleUrls: ['./pago-crear.page.scss'],
  standalone: false
})
export class PagoCrearPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private pagosService: Pago,
    private metodosService: Metodo
  ) { }

  private editarDatos = [];
  @Input() pag_id: number | undefined;
  public pago!: FormGroup;
  metodos: any = [];
  baseUrl: string = "http://localhost:8080/pagos"

  ngOnInit() {
    this.cargarMetodos();
    if (this.pag_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'pag_monto': [
      { type: 'required', message: 'Monto requerido.' },
    ],
    'pag_fecha_pago': [
      { type: 'required', message: 'Fecha de pago requerida.' },
    ],
    'pag_referencia': [
      { type: 'required', message: 'Referencia requerida.' },
    ],
    'pag_fkmet_id': [
      { type: 'required', message: 'Método requerido.' },
    ],
  }

  async cargarMetodos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.metodosService.listado().subscribe(
        response => {
          this.metodos = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
    loading.dismiss();
  }

  private formulario() {
    this.pago = this.formBuilder.group({
      pag_monto: ['', [Validators.required]],
      pag_fecha_pago: ['', [Validators.required]],
      pag_referencia: ['', [Validators.required]],
      pag_fkmet_id: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.pago.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.pag_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.pago.get(String(key));
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
      const pago = this.pago?.value;
      if (this.pag_id === undefined) {
        try {
          await this.pagosService.crear(pago).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.pag_referencia, 'El pago con referencia ' + response.data.pag_referencia + ' ha sido registrado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(pago.pag_referencia, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(pago.pag_referencia, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.pagosService.actualizar(this.pag_id, pago).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.pag_referencia, 'El pago con referencia: ' + response.data.pag_referencia + ' ha sido actualizado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(pago.pag_referencia, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 401) {
                this.alertGuardado(pago.pag_referencia, error?.response?.data[0]?.message, "No se puede guardar, no tienes credenciales");
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
      header: 'Pago',
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

import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Municipio } from '../services/municipio';
import { Pais } from '../services/pais';
import axios from 'axios';

@Component({
  selector: 'app-municipio-crear',
  templateUrl: './municipio-crear.page.html',
  styleUrls: ['./municipio-crear.page.scss'],
  standalone: false
})
export class MunicipioCrearPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private municipiosService: Municipio,
    private paisService: Pais
  ) { }

  private editarDatos: any = {};
  @Input() mun_id: number | undefined;
  public municipio!: FormGroup;
  paises: any = [];
  baseUrl: string = "http://localhost:8080/municipio"

  ngOnInit() {
    this.cargarPaises();
    if (this.mun_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'mun_nombre': [
      { type: 'required', message: 'Nombre requerido.' },
    ],
    'mun_fkestd_id': [
      { type: 'required', message: 'País requerido.' },
    ],
  }

  async cargarPaises() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.paisService.listado().subscribe(
        response => {
          this.paises = response;
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
    this.municipio = this.formBuilder.group({
      mun_nombre: ['', [Validators.required]],
      mun_fkestd_id: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.municipio.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  getDetalles() {
    if (this.mun_id) {
      this.municipiosService.detalle(this.mun_id.toString()).subscribe(
        (response: any) => {
          if (Array.isArray(response)) {
            this.editarDatos = response[0];
          } else {
            this.editarDatos = response;
          }

          if (this.editarDatos) {
            this.municipio.patchValue({
              mun_nombre: this.editarDatos.mun_nombre || '',
              mun_fkestd_id: this.editarDatos.mun_fkestd_id || ''
            });
          }
        }
      );
    }
  }


  async guardarDatos() {
    try {
      const municipio = this.municipio?.value;
      if (this.mun_id === undefined) {
        try {
          await this.municipiosService.crear(municipio).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.mun_nombre, 'El municipio ' + response.data.mun_nombre + ' ha sido registrado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(municipio.mun_nombre, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(municipio.mun_nombre, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.municipiosService.actualizar(this.mun_id, municipio).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.mun_nombre, 'El municipio: ' + response.data.mun_nombre + ' ha sido actualizado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(municipio.mun_nombre, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 401) {
                this.alertGuardado(municipio.mun_nombre, error?.response?.data[0]?.message, "No se puede guardar, no tienes credenciales");
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
      header: 'Municipio',
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

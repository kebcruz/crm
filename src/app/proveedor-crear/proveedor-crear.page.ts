import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Proveedor } from '../services/proveedor';
import { Estatu } from '../services/estatu';
import { Domicilio } from '../services/domicilio';
import axios from 'axios';

@Component({
  selector: 'app-proveedor-crear',
  templateUrl: './proveedor-crear.page.html',
  styleUrls: ['./proveedor-crear.page.scss'],
  standalone: false
})
export class ProveedorCrearPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private proveedoresService: Proveedor,
    private estatusService: Estatu,
    private domiciliosService: Domicilio
  ) { }

  private editarDatos = [];
  @Input() prov_id: number | undefined;
  public proveedor!: FormGroup;
  estatus: any = [];
  domicilios: any = [];
  baseUrl: string = "http://localhost:8080/proveedors"

  ngOnInit() {
    this.cargarEstatus();
    this.cargarDomicilios();
    if (this.prov_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'prov_nombre': [
      { type: 'required', message: 'Nombre del proveedor requeridos.' },
    ],
    'prov_contacto': [
      { type: 'required', message: 'Nombre del representante requeridos.' },
    ],
    'prov_telefono': [
      { type: 'required', message: 'Teléfono requerido.' },
    ],
    'prov_correo': [
      { type: 'required', message: 'Correo requerido.' },
    ],
    'prov_fecha_creacion': [
      { type: 'required', message: 'Correo requerido.' },
    ],
    'prov_fkest_id': [
      { type: 'required', message: 'estatus requerido.' },
    ],
    'prov_fkdom_id': [
      { type: 'required', message: 'domicilio requerido.' },
    ],
  }

  async cargarEstatus() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.estatusService.listado().subscribe(
        response => {
          this.estatus = response;
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

  async cargarDomicilios() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.domiciliosService.listado().subscribe(
        response => {
          this.domicilios = response;
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
    this.proveedor = this.formBuilder.group({
      prov_nombre: ['', [Validators.required]],
      prov_contacto: ['', [Validators.required]],
      prov_telefono: ['', [Validators.required]],
      prov_correo: ['', [Validators.required]],
      prov_fecha_creacion: ['', [Validators.required]],
      prov_fkest_id: ['', [Validators.required]],
      prov_fkdom_id: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.proveedor.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.prov_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.proveedor.get(String(key));
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
      const proveedor = this.proveedor?.value;
      if (this.prov_id === undefined) {
        try {
          await this.proveedoresService.crear(proveedor).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.prov_nombre, 'El proveedor con nombre: ' + response.data.prov_nombre + ' ha sido registrado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(proveedor.prov_nombre, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(proveedor.prov_nombre, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.proveedoresService.actualizar(this.prov_id, proveedor).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.prov_nombre, 'El proveedor: ' + response.data.prov_nombre + ' ha sido actualizado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(proveedor.prov_nombre, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 401) {
                this.alertGuardado(proveedor.prov_nombre, error?.response?.data[0]?.message, "No se puede guardar, no tienes credenciales");
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
      header: 'Proveedor',
      subHeader: subMsg,
      message: msg,
      cssClass: 'alert-personalizado',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
          cssClass: 'btn-confirmar'
        },
        {
          text: 'Salir',
          role: 'confirm',
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

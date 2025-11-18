import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Ventas } from '../services/ventas';

@Component({
  selector: 'app-venta-crear',
  templateUrl: './venta-crear.page.html',
  styleUrls: ['./venta-crear.page.scss'],
  standalone: false
})
export class VentaCrearPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private ventasService: Ventas
  ) { }

  private editarDatos = [];
  @Input() ven_id: number | undefined;
  public venta!: FormGroup;
  clientes: any = [];
  empleados: any = [];
  pagos: any = [];
  clienteUrl: string = "http://localhost:8080/clientes"
  empleadoUrl: string = "http://localhost:8080/empleados"
  pagoUrl: string = "http://localhost:8080/pagos"
  baseUrl: string = "http://localhost:8080/ventas"

  ngOnInit() {
    this.cargarClientes();
    this.cargarEmpleados();
    this.cargarPagos();
    if (this.ven_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'ven_fecha_venta': [
      { type: 'required', message: 'Fecha de Venta requeridos.' },
    ],
    'ven_total': [
      { type: 'required', message: 'Total requeridos.' },
    ],
    'ven_fkcli_id': [
      { type: 'required', message: 'Cliente requerido.' },
    ],
    'ven_fkemp_id': [
      { type: 'required', message: 'Empleado requerido.' },
    ],
    'ven_fkpag_id': [
      { type: 'required', message: 'Pago requerido.' },
    ],
  }

  async cargarClientes() {
    const response = await axios({
      method: 'get',
      url: this.clienteUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.clientes = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async cargarEmpleados() {
    const response = await axios({
      method: 'get',
      url: this.empleadoUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.empleados = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async cargarPagos() {
    const response = await axios({
      method: 'get',
      url: this.pagoUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.pagos = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  private formulario() {
    this.venta = this.formBuilder.group({
      ven_fecha_venta: ['', [Validators.required]],
      ven_total: ['', [Validators.required]],
      ven_fkcli_id: ['', [Validators.required]],
      ven_fkemp_id: ['', [Validators.required]],
      ven_fkpag_id: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.venta.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private async alertGuardado(nombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Venta',
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

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.ven_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.venta.get(String(key));
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
      const venta = this.venta?.value;
      if (this.ven_id === undefined) {
        try {
          await this.ventasService.crear(venta).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.ven_id, 'La venta con id: ' + response.data.ven_id + ' ha sido registrada');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(venta.ven_id, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(venta.ven_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.ventasService.actualizar(this.ven_id, venta).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.ven_id, 'El id: ' + response.data.ven_id + ' ha sido actualizado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(venta.ven_id, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 401) {
                this.alertGuardado(venta.ven_id, error?.response?.data[0]?.message, "No se puede guardar, no tienes credenciales");
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

}

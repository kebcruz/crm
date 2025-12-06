import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Ventas } from '../services/ventas';
import { Ventadetalles } from '../services/ventadetalles';
import { Productos } from '../services/productos';
import { Cliente } from '../services/cliente';
import { Empleados } from '../services/empleados';
import { Pago } from '../services/pago';

@Component({
  selector: 'app-venta-crear',
  templateUrl: './venta-crear.page.html',
  styleUrls: ['./venta-crear.page.scss'],
  standalone: false
})
export class VentaCrearPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private ventasService: Ventas,
    private ventadService: Ventadetalles,
    private productosService: Productos,
    private clientesService: Cliente,
    private empleadosService: Empleados,
    private pagosService: Pago
  ) { }

  private editarDatos = [];
  @Input() ven_id: number | undefined;
  public venta!: FormGroup;
  public productos: any[] = [];
  public productosCargados = false;
  clientes: any = [];
  empleados: any = [];
  pagos: any = [];
  pagoUrl: string = "http://localhost:8080/pagos"
  baseUrl: string = "http://localhost:8080/ventas"

  ngOnInit() {
    this.cargarClientes();
    this.cargarEmpleados();
    this.cargarProductos();
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
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.clientesService.listado().subscribe(
        response => {
          this.clientes = response;
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

  async cargarEmpleados() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.empleadosService.listado().subscribe(
        response => {
          this.empleados = response;
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

  async cargarProductos() {
    try {
      await this.productosService.listado('?per-page=100').subscribe(
        response => {
          this.productos = response;
          this.productosCargados = true;
        },
        error => {
          console.error('Error productos:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async cargarPagos() {
    try {
      await this.pagosService.listado('?per-page=100').subscribe(
        response => {
          this.pagos = response;
        },
        error => {
          console.error('Error productos:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }


  private formulario() {
    this.venta = this.formBuilder.group({
      ven_fecha_venta: ['', [Validators.required]],
      ven_total: ['', [Validators.required]],
      ven_fkcli_id: ['', [Validators.required]],
      ven_fkemp_id: ['', [Validators.required]],
      ven_fkpag_id: ['', [Validators.required]],
      productos: this.formBuilder.array([])
    })
  }

  get productosFA(): FormArray {
    return this.venta.get('productos') as FormArray;
  }

  agregarProducto() {
    this.productosFA.push(
      this.formBuilder.group({
        ved_fkpro_id: ['', [Validators.required]],
        ved_cantidad: [1, Validators.required],
        ved_precio: ['', Validators.required],
        ved_descuento: [0],
        ved_subtotal: ['', Validators.required],
      })
    );
  }

  eliminarProducto(index: number) {
    this.productosFA.removeAt(index);
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.venta.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  private guardarProductos(ven_id: string) {
    const productosSeleccionados: number[] = this.productosFA.value.filter((pro_id: any) => pro_id != null && pro_id !== '');

    if (!productosSeleccionados.length) {
      return;
    }

    productosSeleccionados.forEach(proId => {
      this.ventadService.crear({
        ved_fkven_id: ven_id,
        ved_fkpro_id: proId
      }).subscribe(
        resp => console.log('Porducto guardada', resp),
        err => console.error('Error guardando producto', err)
      );
    });
  }

  private async alertGuardado(nombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Venta',
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
                const ventaCreada = response.data.ven_id;
                this.guardarProductos(ventaCreada);
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

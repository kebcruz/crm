import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Productos } from '../services/productos';
import axios from 'axios';
import { Proveedor } from '../services/proveedor';
import { Categoria } from '../services/categoria';
import { Archivo } from '../services/archivo';
import { Color } from '../services/color';
import { Estatu } from '../services/estatu';

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.page.html',
  styleUrls: ['./producto-crear.page.scss'],
  standalone: false
})
export class ProductoCrearPage implements OnInit {

  @Input() pro_id: number | undefined;
  baseUrl: string = "http://localhost:8080/productos"
  categoriaUrl: string = "http://localhost:8080/categoria" /* Peticion para datos de llave foranea */
  proveedorUrl: string = "http://localhost:8080/proveedor" /* Peticion para datos de llave foranea */
  estatusVentaUrl: string = "http://localhost:8080/estatu" /* Peticion para datos de llave foranea */
  archivoUrl: string = "http://localhost:8080/archivo" /* Peticion para datos de llave foranea */
  colorUrl: string = "http://localhost:8080/color" /* Peticion para datos de llave foranea */

  public producto!: FormGroup;

  categorias: any = []; /* Guardar datos de llave foranea */
  proveedores: any = []; /* Guardar datos de llave foranea */
  estatusVenta: any = []; /* Guardar datos de llave foranea */
  archivos: any = []; /* Guardar datos de llave foranea */
  colores: any = []; /* Guardar datos de llave foranea */
  private editarDatos = []; /* Pedir los datos del registro a actualizar para guardarlos aqui */

  constructor(
    private loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private modalCtrl: ModalController,
    private productoService: Productos,
    private proveedorService: Proveedor,
    private categoriaService: Categoria,
    private archivoService: Archivo,
    private coloreService: Color,
    private estatuService: Estatu,
  ) { }

  ngOnInit() {
    this.cargarCategorias();
    this.cargarProveedores();
    this.cargarestatusVenta();
    this.cargarArchivos();
    this.cargarColores();
    if (this.pro_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion: any = {
    'pro_nombre': [
      { type: 'required', message: 'Nombre requerido.' },
    ],
    'pro_precio': [
      { type: 'required', message: 'Precio requerido.' },
      { type: 'min', message: 'El precio debe ser mayor que 0.' },
    ],
    'pro_sku': [
      { type: 'maxlength', message: 'No puede tener más de 20 caracteres.' },
      { type: 'pattern', message: 'Solo se permiten letras, números, guiones y guiones bajos.' },
    ],
    'pro_descuento': [
      { type: 'min', message: 'El descuento no puede ser menor que 0%.' },
      { type: 'max', message: 'El descuento no puede superar el 100%.' },
    ],
    'pro_stock': [
      { type: 'required', message: 'Cantidad disponible requerida.' },
      { type: 'min', message: 'El stock no puede ser negativo.' },
    ],
    'pro_fecha_creacion': [
      { type: 'required', message: 'Fecha de creación requerido.' },
    ],
    'pro_fkcat_id': [
      { type: 'required', message: 'Categoria requerido.' },
    ],
    'pro_fkproveedor_id': [
      { type: 'required', message: 'Proveedor requerido.' },
    ],
    'pro_fkest_id': [
      { type: 'required', message: 'Estatus requerido.' },
    ],
    'pro_fkcol_id': [
      { type: 'required', message: 'Colores disponibles requerido.' },
    ],
  }

  private formulario() {
    this.producto = this.formBuilder.group({
      pro_nombre: ['', [Validators.required]],
      pro_caracteristica: [''],
      pro_precio: ['', [Validators.required, Validators.min(0.01)]],
      pro_sku: ['', [
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern("^[A-Za-z0-9_-]+$")
      ]],
      pro_descuento: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      pro_stock: ['', [Validators.required, Validators.min(0)]],
      pro_fecha_creacion: ['', [Validators.required]],
      pro_fkcat_id: ['', [Validators.required]],
      pro_fkproveedor_id: ['', [Validators.required]],
      pro_fkest_id: ['', [Validators.required]],
      pro_fkarc_id: [''],
      pro_fkcol_id: ['', [Validators.required]],
    })
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.producto.get(controlName);
    if (control?.touched && control?.errors != null) {
      errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  /* Para cargar los datos llave foranea */
  async cargarCategorias() {
    const response = await axios({
      method: 'get',
      url: this.categoriaUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.categorias = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }
  async cargarProveedores() {
    const response = await axios({
      method: 'get',
      url: this.proveedorUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.proveedores = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }
  async cargarestatusVenta() {
    const response = await axios({
      method: 'get',
      url: this.estatusVentaUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.estatusVenta = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }
  async cargarArchivos() {
    const response = await axios({
      method: 'get',
      url: this.archivoUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.archivos = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }
  async cargarColores() {
    const response = await axios({
      method: 'get',
      url: this.colorUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.colores = response.data;
    }).catch(function (error) {
      console.log(error);
    });
  }

  async getDetalles() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.pro_id,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.editarDatos = response.data;
      Object.keys(this.editarDatos).forEach((key: any) => {
        const control = this.producto.get(String(key));
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
      const producto = this.producto?.value;
      if (this.pro_id === undefined) {
        try {
          await this.productoService.crear(producto).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.pro_nombre, 'El producto con nombre ' + response.data.pro_nombre + ' ha sido registrado');
                this.resetFormulario();
              }
            },
            error => {
              this.handleError(error, producto.cli_nombre);
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.productoService.actualizar(this.pro_id, producto).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.pro_nombre, 'El producto con nombre ' + response.data.pro_nombre + ' ha sido actualizado');
              }
            },
            error => {
              this.handleError(error, producto.pro_nombre);
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
    this.producto.reset();
    this.producto.markAsPristine();
    this.producto.markAsUntouched();
  }

  private async alertGuardado(proNombre: String, msg = "", subMsg = "Guardado") {
    const alert = await this.alert.create({
      header: 'Producto',
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

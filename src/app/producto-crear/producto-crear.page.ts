import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Productos } from '../services/productos';
import axios from 'axios';

@Component({
  selector: 'app-producto-crear',
  templateUrl: './producto-crear.page.html',
  styleUrls: ['./producto-crear.page.scss'],
  standalone: false
})
export class ProductoCrearPage implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController,
    private productosService: Productos
  ) { }

  private editarDatos = [];
  @Input() pro_id: number | undefined;
  public producto!: FormGroup;
  categorias: any=[];
  proveedores: any=[];
  estatus: any=[];
  archivos: any=[];
  colores: any=[];
  categoriaUrl: string = "http://localhost:8080/categorias"
  proveedorUrl: string = "http://localhost:8080/proveedors"
  estatuUrl: string = "http://localhost:8080/estatus"
  archivoUrl: string = "http://localhost:8080/archivos"
  colorUrl: string = "http://localhost:8080/colors"
  baseUrl:string = "http://localhost:8080/productos"

  ngOnInit() {
    this.cargarCategorias();
    this.cargarProveedores();
    this.cargarEstatus();
    this.cargarArchivos();
    this.cargarColores();
    if (this.pro_id !== undefined) {
      this.getDetalles();
    }
    this.formulario();
  }

  mensajes_validacion:any = {
    'pro_nombre' : [
      {type : 'required' , message : 'Nombre requerido.'},
    ],
    'pro_caracteristica' : [
      {type : 'required' , message : 'Caracteristica requerida.'},
    ],
    'pro_precio' : [
      {type : 'required' , message : 'Precio requerido.'},
    ],
    'pro_sku' : [
      {type : 'required' , message : 'SKU requerido.'},
    ],
    'pro_descuento' : [
      {type : 'required' , message : 'Descuento requerido.'},
    ],
    'pro_stock' : [
      {type : 'required' , message : 'Stock requerido.'},
    ],
    'pro_fecha_creacion' : [
      {type : 'required' , message : 'Fecha de creación requerida.'},
    ],
    'pro_fkcat_id' : [
      {type : 'required' , message : 'Categoria requerida.'},
    ],
    'pro_fkproveedor_id' : [
      {type : 'required' , message : 'Proveedor requerido.'},
    ],
    'pro_fkest_id' : [
      {type : 'required' , message : 'Estatus requerido.'},
    ],
    'pro_fkarc_id' : [
      {type : 'required' , message : 'Archivo requerido.'},
    ],
    'pro_fkcol_id' : [
      {type : 'required' , message : 'Color requerido.'},
    ],
  }

  async cargarCategorias() {
    const response = await axios({
      method: 'get',
      url : this.categoriaUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then( (response) => {
      this.categorias = response.data;
    }).catch(function (error) {
      console.log(error);     
    });
  }

  async cargarProveedores() {
    const response = await axios({
      method: 'get',
      url : this.proveedorUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then( (response) => {
      this.proveedores = response.data;
    }).catch(function (error) {
      console.log(error);     
    });
  }

  async cargarEstatus() {
    const response = await axios({
      method: 'get',
      url : this.estatuUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then( (response) => {
      this.estatus = response.data;
    }).catch(function (error) {
      console.log(error);     
    });
  }

  async cargarArchivos() {
    const response = await axios({
      method: 'get',
      url : this.archivoUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then( (response) => {
      this.archivos = response.data;
    }).catch(function (error) {
      console.log(error);     
    });
  }

  async cargarColores() {
    const response = await axios({
      method: 'get',
      url : this.colorUrl,
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then( (response) => {
      this.colores = response.data;
    }).catch(function (error) {
      console.log(error);     
    });
  }

  private formulario() {
    this.producto = this.formBuilder.group({
      pro_nombre: ['', [Validators.required]],
      pro_caracteristica: ['', [Validators.required]],
      pro_precio: ['', [Validators.required]],
      pro_sku: ['', [Validators.required]],
      pro_descuento: ['', [Validators.required]],
      pro_stock: ['', [Validators.required]],
      pro_fecha_creacion: ['', [Validators.required]],
      pro_fkcat_id: ['', [Validators.required]],
      pro_fkproveedor_id: ['', [Validators.required]],
      pro_fkest_id: ['', [Validators.required]],
      pro_fkarc_id: ['', [Validators.required]],
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

  private async alertGuardado(nombre: String, msg = "",  subMsg= "Guardado") {
    const alert = await this.alert.create({
      header: 'Producto',
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
          await this.productosService.crear(producto).subscribe(
            response => {
              if (response?.status == 201) {
                this.alertGuardado(response.data.pro_nombre, 'El producto con nombre: ' + response.data.pro_nombre + ' ha sido registrada');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(producto.pro_nombre, error?.response?.data[0]?.message, "Error");
              }
              if (error?.response?.status == 500) {
                this.alertGuardado(producto.pro_id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
              }
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await this.productosService.actualizar(this.pro_id, producto).subscribe(
            response => {
              console.log(response)
              if (response?.status == 200) {
                this.alertGuardado(response.data.pro_id, 'El id: ' + response.data.pro_id + ' ha sido actualizado');
              }
            },
            error => {
              if (error?.response?.status == 422) {
                this.alertGuardado(producto.pro_id, error?.response?.data[0]?.message, "Error");
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

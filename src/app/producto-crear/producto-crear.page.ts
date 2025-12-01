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

  constructor(
    private loadingCtrl: LoadingController,
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController,
    private productosService: Productos,
    private proveedoresService: Proveedor,
    private categoriasService: Categoria,
    private archivosService: Archivo,
    private coloresService: Color,
    private estatusService: Estatu,
  ) { }

  private editarDatos = [];
  @Input() pro_id: number | undefined;
  public producto!: FormGroup;
  categorias: any=[];
  proveedores: any=[];
  estatus: any=[];
  archivos: any=[];
  colores: any=[];
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
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.categoriasService.listado().subscribe(
        response => {
          this.categorias = response;
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

  async cargarProveedores() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.proveedoresService.listado().subscribe(
        response => {
          this.proveedores = response;
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

  async cargarArchivos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.archivosService.listado().subscribe(
        response => {
          this.archivos = response;
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

  async cargarColores() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.coloresService.listado().subscribe(
        response => {
          this.colores = response;
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

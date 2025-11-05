import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Productos } from '../services/productos';
import { Router } from '@angular/router';
import { ProductoCrearPage } from '../producto-crear/producto-crear.page';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
  standalone: false
})
export class ProductoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl : AlertController,
    private router: Router,
    private productosService: Productos
  ) { }

  productos: any=[];
  total: number=0;
  page: string='1';
  busqueda:string = '';
  baseUrl:string = "http://localhost:8080/productos"

  ngOnInit() {
    this.cargarProductos();
    this.cargarTotal();
  }

  async cargarProductos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.productosService.listado('?page='+this.page+'&expand=archivoRuta', this.busqueda).subscribe(
        response => {
          this.productos = response;
          this.cargarTotal();
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

  async new() {
    const paginaModal = await this.modalCtrl.create({
      component: ProductoCrearPage,
      breakpoints : [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarProductos();
    });
  }

  async editar(pro_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: ProductoCrearPage,
      componentProps: {
        'pro_id': pro_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
        this.cargarProductos();
    });
  }

  async alertEliminar(pro_id: number, pro_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Producto',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el producto: ' + pro_nombre + '?',
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.eliminar(pro_id, pro_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(pro_id: number, pro_nombre: string) {
    try {
      await this.productosService.eliminar(pro_id).subscribe(
        response => {
          this.alertEliminado(pro_id, 'El producto: ' + pro_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(pro_id, 'El producto: ' + pro_nombre + ' no se puede eliminar');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(pro_id, 'El producto: ' + pro_nombre + ' no se puede eliminar esta siendo utilizado por otro registro');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(pro_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Producto',
      subHeader: msg.includes('no se puede eliminar') ? 'Error al eliminar' : 'Eliminado',
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
            this.regresar();
          },
        },
      ],
    });

    await alert.present();
  }

  private regresar() {
    this.router.navigate(['/producto']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.productosService.total(this.busqueda).subscribe(
        response => {
          this.total = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  pagina(event:any) {
    this.page = event.target.innerText;
    this.cargarProductos();
  }

  handleInput(event:any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarProductos();
  }
}

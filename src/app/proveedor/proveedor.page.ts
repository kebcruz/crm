import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Proveedor } from '../services/proveedor';
import { ProveedorCrearPage } from '../proveedor-crear/proveedor-crear.page';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.page.html',
  styleUrls: ['./proveedor.page.scss'],
  standalone: false
})
export class ProveedorPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private proveedoresService: Proveedor
  ) { }

  proveedores: any = [];
  total: number = 0;
  page: string = '1';
  busqueda: string = '';
  baseUrl: string = "http://localhost:8080/proveedor"

  ngOnInit() {
    this.cargarProveedores();
    this.cargarTotal();
  }

  async cargarProveedores() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.proveedoresService.listado('?page=' + this.page + '', this.busqueda).subscribe(
        response => {
          this.proveedores = response;
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
      component: ProveedorCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarProveedores();
    });
  }

  async editar(prov_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: ProveedorCrearPage,
      componentProps: {
        'prov_id': prov_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarProveedores();
    });
  }

  async alertEliminar(prov_id: number, prov_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Proveedor',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar al proveedor: ' + prov_nombre + '?',
      cssClass: 'alert-personalizado',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btn-cancelar'
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'btn-confirmar',
          handler: () => {
            this.eliminar(prov_id, prov_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(prov_id: number, prov_nombre: string) {
    try {
      await this.proveedoresService.eliminar(prov_id).subscribe(
        response => {
          this.alertEliminado(prov_id, 'El proveedor: ' + prov_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(prov_id, 'El proveedor: ' + prov_nombre + ' no se puede eliminar');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(prov_id, 'El proveedor: ' + prov_nombre + ' no se puede eliminar esta siendo utilizado por otro registro');
          }
          if (error.response?.status == 401) {
            this.alertEliminado(prov_id, 'El proveedor: ' + prov_nombre + ' no se puede eliminar por que no tiene las credenciales');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(prov_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Proveedor',
      subHeader: msg.includes('no se puede eliminar') ? 'Error al eliminar' : 'Eliminado',
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
            this.regresar();
          },
        },
      ],
    });

    await alert.present();
  }

  private regresar() {
    this.router.navigate(['/proveedor']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.proveedoresService.total(this.busqueda).subscribe(
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

  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarProveedores();
  }
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarProveedores();
  }
}

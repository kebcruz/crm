import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { VentaCrearPage } from '../venta-crear/venta-crear.page';
import { Router } from '@angular/router';
import { Ventas } from '../services/ventas';
import { EmpleadoCrearPage } from '../empleado-crear/empleado-crear.page';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
  standalone: false
})
export class VentaPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private ventasService: Ventas
  ) { }
  ventas: any = [];
  total: number = 0;
  page: string = '1';
  busqueda: string = '';
  baseUrl: string = "http://localhost:8080/venta"

  ngOnInit() {
    this.cargarVentas();
    this.cargarTotal();
  }

  async cargarVentas() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.ventasService.listado('?page=' + this.page + '&expand=clienteNombre, empleadoNombre',   this.busqueda).subscribe(
        response => {
          this.ventas = response;
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
      component: VentaCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarVentas();
    });
  }
  
  async editar(ven_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: VentaCrearPage,
      componentProps: {
        'ven_id': ven_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarVentas();
    });
  }

  async alertEliminar(ven_id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Venta',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la: ' + ven_id + '?',
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
            this.eliminar(ven_id);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(ven_id: number) {
    try {
      await this.ventasService.eliminar(ven_id).subscribe(
        response => {
          this.alertEliminado(ven_id, 'La venta: ' + ven_id + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(ven_id, 'La venta: ' + ven_id + ' no se puede eliminar');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(ven_id, 'La venta: ' + ven_id + ' no se puede eliminar esta siendo utilizado por otro registro');
          }
          if (error.response?.status == 401) {
            this.alertEliminado(ven_id, 'La venta: ' + ven_id + ' no se puede eliminar por que no tiene las credenciales');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async alertEliminado(ven_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Venta',
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
    this.router.navigate(['/venta']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.ventasService.total(this.busqueda).subscribe(
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
    this.cargarVentas();
  }
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarVentas();
  }

}

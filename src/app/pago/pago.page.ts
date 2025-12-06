import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Pago } from '../services/pago';
import { PagoCrearPage } from '../pago-crear/pago-crear.page';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
  standalone: false
})
export class PagoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private pagosService: Pago
  ) { }

  pagos: any = [];
  total: number = 0;
  page: string = '1';
  busqueda: string = '';
  baseUrl: string = "http://localhost:8080/pago"

  ngOnInit() {
    this.cargarPagos();
    this.cargarTotal();
  }

  async cargarPagos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.pagosService.listado('?page=' + this.page + '', this.busqueda).subscribe(
        response => {
          this.pagos = response;
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
      component: PagoCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarPagos();
    });
  }

  async editar(pag_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: PagoCrearPage,
      componentProps: {
        'pag_id': pag_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarPagos();
    });
  }

  async alertEliminar(pag_id: number, pag_referencia: string) {
    const alert = await this.alertCtrl.create({
      header: 'Pago',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el pago ' + pag_referencia + '?',
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
            this.eliminar(pag_id, pag_referencia);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(pag_id: number, pag_referencia: string) {
    try {
      await this.pagosService.eliminar(pag_id).subscribe(
        response => {
          this.alertEliminado(pag_id, 'El pago: ' + pag_referencia + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(pag_id, 'El pago: ' + pag_referencia + ' no se puede eliminar');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(pag_id, 'El pago: ' + pag_referencia + ' no se puede eliminar esta siendo utilizado por otro registro');
          }
          if (error.response?.status == 401) {
            this.alertEliminado(pag_id, 'El pago: ' + pag_referencia + ' no se puede eliminar por que no tiene las credenciales');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(pag_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Pago',
      subHeader: 'Eliminado',
      message: msg,
      cssClass: 'alert-personalizado',
      buttons: [
        {
          text: 'Continuar',
          role: 'confirm',
          cssClass: 'btn-confirmar',
          handler: () => {
            this.regresar();
          },
        },
        {
          text: 'Salir',
          role: 'cancel',
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
    this.router.navigate(['/pago']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.pagosService.total(this.busqueda).subscribe(
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
    this.cargarPagos();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarPagos();
  }
}

import { Component, OnInit } from '@angular/core';
import { Estatu } from '../services/estatu';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { EstatuCrearPage } from '../estatu-crear/estatu-crear.page';

@Component({
  selector: 'app-estatu',
  templateUrl: './estatu.page.html',
  styleUrls: ['./estatu.page.scss'],
  standalone: false
})
export class EstatuPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private estatusService: Estatu
  ) { }

  estatus: any = [];
  total: number = 0;
  page: string = '1';
  busqueda: string = '';
  baseUrl: string = "http://localhost:8080/estatu"

  ngOnInit() {
    this.cargarEstatus();
    this.cargarTotal();
  }

  async cargarEstatus() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.estatusService.listado('?page=' + this.page + '', this.busqueda).subscribe(
        response => {
          this.estatus = response;
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
      component: EstatuCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEstatus();
    });
  }

  async editar(est_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: EstatuCrearPage,
      componentProps: {
        'est_id': est_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEstatus();
    });
  }

  async alertEliminar(est_id: number, est_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Estatu',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el estatus' + est_nombre + '?',
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
            this.eliminar(est_id, est_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(est_id: number, est_nombre: string) {
    try {
      await this.estatusService.eliminar(est_id).subscribe(
        response => {
          this.alertEliminado(est_id, 'El estatus: ' + est_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(est_id, 'El estatus: ' + est_nombre + ' no se puede eliminar');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(est_id, 'El estatus: ' + est_nombre + ' no se puede eliminar esta siendo utilizado por otro registro');
          }
          if (error.response?.status == 401) {
            this.alertEliminado(est_id, 'El estatus: ' + est_nombre + ' no se puede eliminar por que no tiene las credenciales');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(est_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Estatu',
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
    this.router.navigate(['/estatu']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.estatusService.total(this.busqueda).subscribe(
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
    this.cargarEstatus();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarEstatus();
  }
}

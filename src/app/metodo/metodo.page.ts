import { Component, OnInit } from '@angular/core';
import { Metodo } from '../services/metodo';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MetodoCrearPage } from '../metodo-crear/metodo-crear.page';

@Component({
  selector: 'app-metodo',
  templateUrl: './metodo.page.html',
  styleUrls: ['./metodo.page.scss'],
  standalone: false
})
export class MetodoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private metodosService: Metodo
  ) { }

  metodos: any = [];
  total: number = 0;
  page: string = '1';
  busqueda: string = '';
  baseUrl: string = "http://localhost:8080/metodo"


  ngOnInit() {
    this.cargarMetodos();
    this.cargarTotal();
  }

  async cargarMetodos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.metodosService.listado('?page=' + this.page + '', this.busqueda).subscribe(
        response => {
          this.metodos = response;
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
      component: MetodoCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarMetodos();
    });
  }

  async editar(met_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: MetodoCrearPage,
      componentProps: {
        'met_id': met_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarMetodos();
    });
  }

  async alertEliminar(met_id: number, met_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Metodo',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar al metodo: ' + met_nombre + '?',
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
            this.eliminar(met_id, met_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(met_id: number, met_nombre: string) {
    try {
      await this.metodosService.eliminar(met_id).subscribe(
        response => {
          this.alertEliminado(met_id, 'El metodo: ' + met_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(met_id, 'El metodo: ' + met_nombre + ' no se puede eliminar');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(met_id, 'El metodo: ' + met_nombre + ' no se puede eliminar esta siendo utilizado por otro registro');
          }
          if (error.response?.status == 401) {
            this.alertEliminado(met_id, 'El metodo: ' + met_nombre + ' no se puede eliminar por que no tiene las credenciales');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

   async alertEliminado(met_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Metodo',
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
    this.router.navigate(['/metodo']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.metodosService.total(this.busqueda).subscribe(
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
    this.cargarMetodos();
  }

  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarMetodos();
  }
}

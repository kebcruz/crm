import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { EstadoCrearPage } from '../estado-crear/estado-crear.page';
import { Router } from '@angular/router';
import { Estado } from '../services/estado';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.page.html',
  styleUrls: ['./estado.page.scss'],
  standalone: false
})
export class EstadoPage implements OnInit {

  baseUrl: string = "http://localhost:8080/estado";
  estados: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private estadoService: Estado
  ) { }

  ngOnInit() {
    this.cargarEstados();
  }

  async cargarEstados() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.estadoService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.estados = response;
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

  async cargarTotal() {
    try {
      await this.estadoService.total(this.busqueda).subscribe(
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

  /* Modal para insertar un nuevo registro */
  async new() {
    const paginaModal = await this.modalCtrl.create({
      /* ClienteCrearPage es el nombre de la clase de la página donde estará nuestro formulario */
      component: EstadoCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEstados();
    });
  }

  /* Abrel el modal para editar a un registro existente */
  async editar(estd_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: EstadoCrearPage,
      /* Abre el modal para crear, o ahora, poder editar */
      componentProps: {
        'estd_id': estd_id
        /* El que importa es el que se encuentra en el lado de las comillas; es el que se muestra */
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEstados();
    });
  }

  /* Confirmación antes de eliminar un registro */
  async alertEliminar(estd_id: number, estd_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Estado',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar al estado ' + estd_nombre + '?',
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
            this.eliminar(estd_id, estd_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  // Llamado a la API para eliminar un registro
  async eliminar(estd_id: number, cli_nombre: string) {
    try {
      await this.estadoService.eliminar(estd_id).subscribe(
        response => {
          this.alertEliminado(estd_id, 'El estado de nombre ' + cli_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(estd_id, 'El estado de nombre ' + cli_nombre + ' ha sido eliminado');
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(estd_id, "No puedes eliminar porque tiene relaciones con otra tabla");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  /* Muestra que el registro ha sido eliminado */
  async alertEliminado(estd_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Estado',
      subHeader: 'Eliminado',
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
          handler: () => {
            this.regresar();
          },
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

  /* Recarga la vista actual */
  private regresar() {
    this.router.navigate(['/estado']).then(() => {
      window.location.reload();
    });
  }

  /* Cambia la pagina actual (Paginación) */
  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarEstados();
  }

  /* Esta función permite guardar el valor introducido en la busqueda convertida ademas en minuscula */
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarEstados();
  }
  
}

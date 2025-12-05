import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Domicilio } from '../services/domicilio';
import { DomicilioCrearPage } from '../domicilio-crear/domicilio-crear.page';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.page.html',
  styleUrls: ['./domicilio.page.scss'],
  standalone: false
})
export class DomicilioPage implements OnInit {

  baseUrl: string = "http://localhost:8080/domicilio" /* Peticion para datos de llave foranea */
  domicilios: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private domicilioService: Domicilio
  ) { }

  ngOnInit() {
    this.cargarDomicilios();
  }

  async cargarDomicilios() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.domicilioService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.domicilios = response;
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

  /* obtiene total de registros */
  async cargarTotal() {
    try {
      await this.domicilioService.total(this.busqueda).subscribe(
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
      component: DomicilioCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarDomicilios();
    });
  }

  /* Abrel el modal para editar a un registro existente */
  async editar(dom_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: DomicilioCrearPage,
      /* Abre el modal para crear, o ahora, poder editar */
      componentProps: {
        'dom_id': dom_id
        /* El que importa es el que se encuentra en el lado de las comillas; es el que se muestra */
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarDomicilios();
    });
  }

  /* Confirmación antes de eliminar un registro */
  async alertEliminar(dom_id: number, dom_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Domicilio',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el domicilio ' + dom_nombre + '?',
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
            this.eliminar(dom_id, dom_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  // Llamado a la API para eliminar un registro
  async eliminar(dom_id: number, dom_nombre: string) {
    try {
      await this.domicilioService.eliminar(dom_id).subscribe(
        response => {
          this.alertEliminado(dom_id, 'El domicilio de nombre ' + dom_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(dom_id, 'El domicilio de nombre ' + dom_nombre + ' ha sido eliminado');
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(dom_id, "No puedes eliminar porque tiene relaciones con otra tabla");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  /* Muestra que el registro ha sido eliminado */
  async alertEliminado(dom_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Domicilio',
      subHeader: 'Eliminado',
      message: msg,
      cssClass: 'alert-personalizado',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
          cssClass: 'btn-confirmar',
          handler: () => {
            this.regresar();
          },
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

  /* Recarga la vista actual */
  private regresar() {
    this.router.navigate(['/domicilio']).then(() => {
      window.location.reload();
    });
  }

  /* Cambia la pagina actual (Paginación) */
  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarDomicilios();
  }

  /* Esta función permite guardar el valor introducido en la busqueda convertida ademas en minuscula */
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarDomicilios();
  }

}

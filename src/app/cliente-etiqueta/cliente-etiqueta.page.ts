import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { ClienteEtiqueta } from '../services/cliente-etiqueta';
import { ClienteEtiquetaCrearPage } from '../cliente-etiqueta-crear/cliente-etiqueta-crear.page';

@Component({
  selector: 'app-cliente-etiqueta',
  templateUrl: './cliente-etiqueta.page.html',
  styleUrls: ['./cliente-etiqueta.page.scss'],
  standalone: false
})
export class ClienteEtiquetaPage implements OnInit {

  baseUrl: string = "http://localhost:8080/cliente-etiqueta";
  etiClientes: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';
  clienteEtiquetas: any = [];

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private cliEtiquetaService: ClienteEtiqueta
  ) { }

  ngOnInit() {
    this.cargarClienteEtiquetas();
  }

  async cargarClienteEtiquetas() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.cliEtiquetaService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.clienteEtiquetas = response;
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
      await this.cliEtiquetaService.total(this.busqueda).subscribe(
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
      component: ClienteEtiquetaCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarClienteEtiquetas();
    });
  }

  /* Abrel el modal para editar a un registro existente */
  async editar(clet_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: ClienteEtiquetaCrearPage,
      /* Abre el modal para crear, o ahora, poder editar */
      componentProps: {
        'clet_id': clet_id
        /* El que importa es el que se encuentra en el lado de las comillas; es el que se muestra */
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarClienteEtiquetas();
    });
  }

  /* Confirmación antes de eliminar un registro */
  async alertEliminar(clet_id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Etiqueta-Cliente',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar esta etiqueta?',
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
            this.eliminar(clet_id);
          }
        }
      ]
    });
    await alert.present();
  }

  // Llamado a la API para eliminar un registro
  async eliminar(clet_id: number) {
    try {
      await this.cliEtiquetaService.eliminar(clet_id).subscribe(
        response => {
          this.alertEliminado(clet_id, 'La etiqueta ha sido eliminada');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(clet_id, 'La etiqueta ha sido elimina');
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(clet_id, "No puedes eliminar porque tiene relaciones con otra tabla");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(clet_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Etiqueta-Cliente',
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
    this.router.navigate(['/cliente-etiqueta']).then(() => {
      window.location.reload();
    });
  }

  /* Cambia la pagina actual (Paginación) */
  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarClienteEtiquetas();
  }

  /* Esta función permite guardar el valor introducido en la busqueda convertida ademas en minuscula */
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarClienteEtiquetas();
  }

}

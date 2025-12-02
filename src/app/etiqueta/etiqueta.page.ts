import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Etiqueta } from '../services/etiqueta';
import { EtiquetaCrearPage } from '../etiqueta-crear/etiqueta-crear.page';

@Component({
  selector: 'app-etiqueta',
  templateUrl: './etiqueta.page.html',
  styleUrls: ['./etiqueta.page.scss'],
  standalone: false
})

export class EtiquetaPage implements OnInit {

  baseUrl: string = "http://localhost:8080/etiqueta";
  etiquetas: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private etiquetaService: Etiqueta
  ) { }

  ngOnInit() {
    this.cargarEtiquetas();
  }

  async cargarEtiquetas() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.etiquetaService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.etiquetas = response;
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
      await this.etiquetaService.total(this.busqueda).subscribe(
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
      /* EtiquetaCrearPage es el nombre de la clase de la página donde estará nuestro formulario */
      component: EtiquetaCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEtiquetas();
    });
  }

  /* Abrel el modal para editar a un registro existente */
  async editar(eti_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: EtiquetaCrearPage,
      /* Abre el modal para crear, o ahora, poder editar */
      componentProps: {
        'eti_id': eti_id
        /* El que importa es el que se encuentra en el lado de las comillas; es el que se muestra */
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEtiquetas();
    });
  }

  /* Confirmación antes de eliminar un registro */
  async alertEliminar(eti_id: number, eti_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Etiqueta',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la etiqueta ' + eti_nombre + '?',
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
            this.eliminar(eti_id, eti_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  // Llamado a la API para eliminar un registro
  async eliminar(eti_id: number, eti_nombre: string) {
    try {
      await this.etiquetaService.eliminar(eti_id).subscribe(
        response => {
          this.alertEliminado(eti_id, 'La etiqueta de nombre ' + eti_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(eti_id, 'La etiqueta de nombre ' + eti_nombre + ' ha sido eliminado');
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(eti_id, "No puedes eliminar porque tiene relaciones con otra tabla");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  /* Muestra que el registro ha sido eliminado */
  async alertEliminado(eti_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Etiqueta',
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
    this.router.navigate(['/etiqueta']).then(() => {
      window.location.reload();
    });
  }

  /* Cambia la pagina actual (Paginación) */
  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarEtiquetas();
  }

  /* Esta función permite guardar el valor introducido en la busqueda convertida ademas en minuscula */
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarEtiquetas();
  }

}

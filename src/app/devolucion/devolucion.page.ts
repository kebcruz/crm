import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Devolucion } from '../services/devolucion';
import { DevolucionCrearPage } from '../devolucion-crear/devolucion-crear.page';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.page.html',
  styleUrls: ['./devolucion.page.scss'],
  standalone: false
})
export class DevolucionPage implements OnInit {

  baseUrl: string = "http://localhost:8080/devolucion"
  devoluciones: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private devolucionService: Devolucion
  ) { }

  ngOnInit() {
    this.cargarDevoluciones();
  }

  async cargarDevoluciones() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.devolucionService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.devoluciones = response;
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
      await this.devolucionService.total(this.busqueda).subscribe(
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
      /* DevolucionCrearPage es el nombre de la clase de la página donde estará nuestro formulario */
      component: DevolucionCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarDevoluciones();
    });
  }

  /* Abrel el modal para editar a un registro existente */
  async editar(dev_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: DevolucionCrearPage,
      /* Abre el modal para crear, o ahora, poder editar */
      componentProps: {
        'dev_id': dev_id
        /* El que importa es el que se encuentra en el lado de las comillas; es el que se muestra */
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarDevoluciones();
    });
  }

  /* Confirmación antes de eliminar un registro */
  async alertEliminar(dev_id: number, dev_asunto: string) {
    const alert = await this.alertCtrl.create({
      header: 'Devolución',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la devolución ' + dev_asunto + '?',
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
            this.eliminar(dev_id, dev_asunto);
          }
        }
      ]
    });
    await alert.present();
  }

  /* Llamado a la API para eliminar un registro */
  async eliminar(dev_id: number, dev_asunto: string) {
    try {
      await this.devolucionService.eliminar(dev_id).subscribe(
        response => {
          this.alertEliminado(dev_id, 'La devolución ' + dev_asunto + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(dev_id, 'El cliente ' + dev_asunto + ' ha sido eliminado');
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(dev_id, "No puedes eliminar porque tiene relaciones con otra tabla");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  /* Muestra que el registro ha sido eliminado */
  async alertEliminado(dev_id: Number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Devolución',
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
    this.router.navigate(['/devolucion']).then(() => {
      window.location.reload();
    });
  }

  /* Cambia la pagina actual (Paginación) */
  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarDevoluciones();
  }

  /* Esta función permite guardar el valor introducido en la busqueda convertida ademas en minuscula */
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarDevoluciones();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Puesto } from '../services/puesto';
import { PuestoCrearPage } from '../puesto-crear/puesto-crear.page';

@Component({
  selector: 'app-puesto',
  templateUrl: './puesto.page.html',
  styleUrls: ['./puesto.page.scss'],
  standalone: false
})
export class PuestoPage implements OnInit {

  baseUrl: string = "http://localhost:8080/puesto";
  puestos: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private puestoService: Puesto
  ) { }

  ngOnInit() {
    this.cargarPuestos();
  }

  async cargarPuestos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.puestoService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.puestos = response;
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
      await this.puestoService.total(this.busqueda).subscribe(
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
      component: PuestoCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarPuestos();
    });
  }

  /* Abrel el modal para editar a un registro existente */
  async editar(pue_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: PuestoCrearPage,
      /* Abre el modal para crear, o ahora, poder editar */
      componentProps: {
        'pue_id': pue_id
        /* El que importa es el que se encuentra en el lado de las comillas; es el que se muestra */
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarPuestos();
    });
  }

  /* Confirmación antes de eliminar un registro */
  async alertEliminar(pue_id: number, pue_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Puesto',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el puesto ' + pue_nombre + '?',
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
            this.eliminar(pue_id, pue_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  // Llamado a la API para eliminar un registro
  async eliminar(pue_id: number, pue_nombre: string) {
    try {
      await this.puestoService.eliminar(pue_id).subscribe(
        response => {
          this.alertEliminado(pue_id, 'El puesto de nombre ' + pue_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(pue_id, 'El puesto de nombre ' + pue_nombre + ' ha sido eliminado');
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(pue_id, "No puedes eliminar porque tiene relaciones con otra tabla");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  /* Muestra que el registro ha sido eliminado */
  async alertEliminado(pue_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Puesto',
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
    this.router.navigate(['/puesto']).then(() => {
      window.location.reload();
    });
  }

  /* Cambia la pagina actual (Paginación) */
  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarPuestos();
  }

  /* Esta función permite guardar el valor introducido en la busqueda convertida ademas en minuscula */
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarPuestos();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Archivo } from '../services/archivo';
import { ArchivoCrearPage } from '../archivo-crear/archivo-crear.page';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.page.html',
  styleUrls: ['./archivo.page.scss'],
  standalone: false
})
export class ArchivoPage implements OnInit {

  baseUrl: string = "http://localhost:8080/archivo"
  archivos: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private archivoService: Archivo
  ) { }

  ngOnInit() {
    this.cargarArchivos();
  }

  async cargarArchivos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.archivoService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.archivos = response;
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
      await this.archivoService.total(this.busqueda).subscribe(
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

  /* obtiene total de registros 
  async cargarTotal() {
    const response = await axios({
      method: 'get',
      url: this.baseUrl + '/total',
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.total = response.data;
      console.log('Total de registros:', this.total);
    }).catch(function (error) {
      console.log(error);
    });
  }
  */

  /* Función que nos permitira abrir el modal */
  async new() {
    const paginaModal = await this.modalCtrl.create({
      /* ClienteCrearPage es el nombre de la clase de la página donde estará nuestro formulario */
      component: ArchivoCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarArchivos();
    });
  }

  async editar(arc_id: Number) {
    const paginaModal = await this.modalCtrl.create({
      component: ArchivoCrearPage,
      /* Abre el modal para crear, o ahora, poder editar */
      componentProps: {
        'arc_id': arc_id
        /* El que importa es el que se encuentra en el lado de las comillas; es el que se muestra */
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarArchivos();
    });
  }

  async alertEliminar(arc_id: number, arc_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Archivo',
      subHeader: 'Eliminar', 
      message: '¿Estás seguro de eliminar el archivo ' + arc_nombre + '?',
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
            this.eliminar(arc_id, arc_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  // Llamado a la API para eliminar un registro
  async eliminar(arc_id: number, arc_nombre: string) {
    try {
      await this.archivoService.eliminar(arc_id).subscribe(
        response => {
          this.alertEliminado(arc_id, 'El archivo con nombre ' + arc_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(arc_id, 'El archivo ' + arc_nombre + ' ha sido eliminado');
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(arc_id, "No puedes eliminar porque tiene relaciones con otra tabla");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(arc_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Archivo',
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

  /* Recarga la vista actual */
  private regresar() {
    this.router.navigate(['/archivo']).then(() => {
      window.location.reload();
    });
  }

  /* Cambia la pagina actual (Paginación) */
  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarArchivos();
  }

  /* Esta función permite guardar el valor introducido en la busqueda convertida ademas en minuscula */
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarArchivos();
  }


}

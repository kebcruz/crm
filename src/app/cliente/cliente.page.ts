import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Cliente } from '../services/cliente';
import { ClienteCrearPage } from '../cliente-crear/cliente-crear.page';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
  standalone: false
})
export class ClientePage implements OnInit {

  baseUrl: string = "http://localhost:8080/cliente";
  clientes: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private clienteService: Cliente
  ) { }

  ngOnInit() {
    this.cargarClientes();
  }

  async cargarClientes() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.clienteService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.clientes = response;
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
      await this.clienteService.total(this.busqueda).subscribe(
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
      component: ClienteCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarClientes();
    });
  }

  /* Abrel el modal para editar a un registro existente */
  async editar(cli_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: ClienteCrearPage,
      /* Abre el modal para crear, o ahora, poder editar */
      componentProps: {
        'cli_id': cli_id
        /* El que importa es el que se encuentra en el lado de las comillas; es el que se muestra */
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarClientes();
    });
  }

  /* Confirmación antes de eliminar un registro */
  async alertEliminar(cli_id: number, cli_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Cliente',
      /* subHeader: 'Eliminar', */
      message: '¿Estás seguro de eliminar al cliente ' + cli_nombre + '?',
      cssClass: 'alert-personalizado',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btn-cancelar',
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          cssClass: 'btn-confirmar',
          handler: () => {
            this.eliminar(cli_id, cli_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  // Llamado a la API para eliminar un registro
  async eliminar(cli_id: number, cli_nombre: string) {
    try {
      await this.clienteService.eliminar(cli_id).subscribe(
        response => {
          this.alertEliminado(cli_id, 'El cliente de nombre ' + cli_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(cli_id, 'El cliente de nombre ' + cli_nombre + ' ha sido eliminado');
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(cli_id, "No puedes eliminar porque tiene relaciones con otra tabla");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  /* Muestra que el registro ha sido eliminado */
  async alertEliminado(cli_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Cliente Eliminado',
      /* subHeader: 'Eliminado', */
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
    this.router.navigate(['/cliente']).then(() => {
      window.location.reload();
    });
  }

  /* Cambia la pagina actual (Paginación) */
  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarClientes();
  }

  /* Esta función permite guardar el valor introducido en la busqueda convertida ademas en minuscula */
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarClientes();
  }

}

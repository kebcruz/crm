import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Categoria } from '../services/categoria';
import { CategoriaCrearPage } from '../categoria-crear/categoria-crear.page';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  standalone: false
})
export class CategoriaPage implements OnInit {

  baseUrl: string = "http://localhost:8080/categoria";
  categorias: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private categoriaService: Categoria
  ) { }

  ngOnInit() {
    this.cargarCategorias()
    this.cargarTotal();
  }

  async cargarCategorias() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.categoriaService.listado('?page=' + this.page, this.busqueda).subscribe(
        response => {
          this.categorias = response;
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
      await this.categoriaService.total(this.busqueda).subscribe(
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
      component: CategoriaCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarCategorias();
    });
  }

  /* Abrel el modal para editar a un registro existente */
  async editar(cat_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: CategoriaCrearPage,
      /* Abre el modal para crear, o ahora, poder editar */
      componentProps: {
        'cat_id': cat_id
        /* El que importa es el que se encuentra en el lado de las comillas; es el que se muestra */
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarCategorias();
    });
  }

  /* Confirmación antes de eliminar un registro */
  async alertEliminar(cat_id: number, cat_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Categoria',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la categoria ' + cat_nombre + '?',
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
            this.eliminar(cat_id, cat_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  // Llamado a la API para eliminar un registro
  async eliminar(cat_id: number, cat_nombre: string) {
    try {
      await this.categoriaService.eliminar(cat_id).subscribe(
        response => {
          this.alertEliminado(cat_id, 'La categoria de nombre ' + cat_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(cat_id, 'La categoria de nombre  ' + cat_nombre + ' ha sido eliminado');
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(cat_id, "No puedes eliminar porque tiene relaciones con otra tabla");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  /* Muestra que el registro ha sido eliminado */
  async alertEliminado(cat_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Categoria',
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
    this.router.navigate(['/categoria']).then(() => {
      window.location.reload();
    });
  }

  /* Cambia la pagina actual (Paginación) */
  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarCategorias();
  }

  /* Esta función permite guardar el valor introducido en la busqueda convertida ademas en minuscula */
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarCategorias();
  }

}

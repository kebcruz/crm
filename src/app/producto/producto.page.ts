import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { Productos } from '../services/productos';
import { Router } from '@angular/router';
import { ProductoCrearPage } from '../producto-crear/producto-crear.page';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
  standalone: false
})
export class ProductoPage implements OnInit {

  baseUrl: string = "http://localhost:8080/producto"
  productos: any = [];
  total: number = 0;
  page: string = "1";
  busqueda: string = '';

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private productoService: Productos
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.cargarTotal();
  }

  getImageUrl(producto: any): string {
    if (producto?.archivo?.arc_ruta) {
      return environment.apiUrl + producto.archivo.arc_ruta;
    }
    return 'assets/images/placeholder.jpg';
  }

  // Método para manejar errores de carga de imagen
  onImageError(event: any) {
    console.log('Error cargando imagen, usando placeholder');
    event.target.src = 'assets/images/placeholder.jpg';
  }

  async cargarProductos() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.productoService.listado('?page=' + this.page + '&expand=archivo', this.busqueda).subscribe(
        response => {
          console.log('Datos de productos:', response); // ← Agrega esto
          this.productos = response;
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
      await this.productoService.total(this.busqueda).subscribe(
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

  /* Función que nos permitira abrir el modal */
  async new() {
    const paginaModal = await this.modalCtrl.create({
      /* ClienteCrearPage es el nombre de la clase de la página donde estará nuestro formulario */
      component: ProductoCrearPage,
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarProductos();
    });
  }

  async editar(pro_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: ProductoCrearPage,
      /* Abre el modal para crear, o ahora, poder editar */
      componentProps: {
        'pro_id': pro_id
        /* El que importa es el que se encuentra en el lado de las comillas; es el que se muestra */
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarProductos();
    });
  }

  async alertEliminar(pro_id: number, pro_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Producto',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar el producto ' + pro_nombre + '?',
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
            this.eliminar(pro_id, pro_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  // Llamado a la API para eliminar un registro
  async eliminar(pro_id: number, pro_nombre: string) {
    try {
      await this.productoService.eliminar(pro_id).subscribe(
        response => {
          this.alertEliminado(pro_id, 'El producto ' + pro_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(pro_id, 'El producto ' + pro_nombre + ' ha sido eliminado');
          }
          if (error?.response?.status == 500) {
            this.alertEliminado(pro_id, "No puedes eliminar porque tiene relaciones con otra tabla");
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async alertEliminado(pro_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Producto',
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

  private regresar() {
    this.router.navigate(['/producto']).then(() => {
      window.location.reload();
    });
  }

  /* Cambia la pagina actual (Paginación) */
  pagina(event: any) {
    this.page = event.target.innerText;
    this.cargarProductos();
  }

  /* Esta función permite guardar el valor introducido en la busqueda convertida ademas en minuscula */
  handleInput(event: any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarProductos();
  }

}

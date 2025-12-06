import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Municipio } from '../services/municipio';
import { MunicipioCrearPage } from '../municipio-crear/municipio-crear.page';

@Component({
  selector: 'app-municipio',
  templateUrl: './municipio.page.html',
  styleUrls: ['./municipio.page.scss'],
  standalone: false
})
export class MunicipioPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router,
    private municipiosService: Municipio
  ) { }

  municipios: any=[];
  total: number = 0;
  page: string = '1';
  busqueda: string = '';
  baseUrl: string = "http://localhost:8080/municipio"

  ngOnInit() {
    this.cargarMunicipios();
    this.cargarTotal();
  }

  async cargarMunicipios() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.municipiosService.listado('?page=' + this.page + '&expand=estadoNombre', this.busqueda).subscribe(
        response => {
          this.municipios = response;
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

  async new() {
      const paginaModal = await this.modalCtrl.create({
        component: MunicipioCrearPage,
        breakpoints: [0, 0.3, 0.5, 0.95],
        initialBreakpoint: 0.95
      });
      await paginaModal.present();
      paginaModal.onDidDismiss().then((data) => {
        this.cargarMunicipios();
      });
    }
  
    async editar(mun_id: number) {
      const paginaModal = await this.modalCtrl.create({
        component: MunicipioCrearPage,
        componentProps: {
          'mun_id': mun_id
        },
        breakpoints: [0, 0.3, 0.5, 0.95],
        initialBreakpoint: 0.95
      });
      await paginaModal.present();
      paginaModal.onDidDismiss().then((data) => {
        this.cargarMunicipios();
      });
    }
  
    async alertEliminar(mun_id: number, mun_nombre: string) {
      const alert = await this.alertCtrl.create({
        header: 'Municipio',
        subHeader: 'Eliminar',
        message: '¿Estás seguro de eliminar el municipio ' + mun_nombre + '?',
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
              this.eliminar(mun_id, mun_nombre);
            }
          }
        ]
      });
      await alert.present();
    }
  
    async eliminar(mun_id: number, mun_nombre: string) {
      try {
        await this.municipiosService.eliminar(mun_id).subscribe(
          response => {
            this.alertEliminado(mun_id, 'El municipio: ' + mun_nombre + ' ha sido eliminado');
          },
          error => {
            console.error('Error:', error);
            if (error.response?.status == 204) {
              this.alertEliminado(mun_id, 'El municipio: ' + mun_nombre + ' no se puede eliminar');
            }
            if (error.response?.status == 500) {
              this.alertEliminado(mun_id, 'El municipio: ' + mun_nombre + ' no se puede eliminar esta siendo utilizado por otro registro');
            }
            if (error.response?.status == 401) {
              this.alertEliminado(mun_id, 'El municipio: ' + mun_nombre + ' no se puede eliminar por que no tiene las credenciales');
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  
    async alertEliminado(mun_id: number, msg = "") {
      const alert = await this.alertCtrl.create({
        header: 'Municipio',
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
  
    private regresar() {
      this.router.navigate(['/municipio']).then(() => {
        window.location.reload();
      });
    }
  
    async cargarTotal() {
      try {
        await this.municipiosService.total(this.busqueda).subscribe(
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
  
    pagina(event: any) {
      this.page = event.target.innerText;
      this.cargarMunicipios();
    }
  
    handleInput(event: any) {
      this.busqueda = event.target.value.toLowerCase();
      this.cargarMunicipios();
    }
}

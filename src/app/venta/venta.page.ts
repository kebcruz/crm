import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
  standalone: false
})
export class VentaPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
  ) { }
  ventas: any=[];

  ngOnInit() {
    this.cargarVentas();
  }

  async cargarVentas(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://localhost:8080/venta?expand=clienteNombre,empleadoNombre",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.ventas = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);     
    });
    loading.dismiss();
  }

/*   async new() {
    const paginaModal = await this.modalCtrl.create({
      component: VentasCrearPage,
      breakpoints : [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarVentas();
    });
  } */

}

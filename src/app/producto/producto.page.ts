import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
  standalone: false
})
export class ProductoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  productos: any=[];

  ngOnInit() {
    this.cargarProductos();
  }

  async cargarProductos(event?: InfiniteScrollCustomEvent) {
      const loading = await this.loadingCtrl.create({
          message: 'Cargando',
          spinner: 'bubbles',
      });
      await loading.present();
      const response = await axios({
          method: 'get',
          url: "http://localhost:8080/producto?expand=archivoRuta",
          withCredentials: true,
          headers: {
              'Accept': 'application/json'
          }
      }).then((response) => {
          this.productos = response.data;
          event?.target.complete();
      }).catch(function (error) {
          console.log(error);     
      });
      loading.dismiss();
  }
}

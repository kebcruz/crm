import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-color',
  templateUrl: './color.page.html',
  styleUrls: ['./color.page.scss'],
  standalone:false
})
export class ColorPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) {}
  colores: any = [];

  ngOnInit() {
    this.cargarColores();
  }
  async cargarColores(event?: InfiniteScrollCustomEvent) {
      const loading = await this.loadingCtrl.create({
          message: 'Cargando',
          spinner: 'bubbles',
      });
      await loading.present();
      const response = await axios({
          method: 'get',
          url: "http://localhost:8080/color",
          withCredentials: true,
          headers: {
              'Accept': 'application/json'
          }
      }).then((response) => {
          this.colores = response.data;
          event?.target.complete();
      }).catch(function (error) {
          console.log(error);     
      });
      loading.dismiss();
  }
}

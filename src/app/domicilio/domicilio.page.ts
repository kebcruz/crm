import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.page.html',
  styleUrls: ['./domicilio.page.scss'],
  standalone: false
})
export class DomicilioPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }
  domicilios: any=[];

  ngOnInit() {
    this.cargarDomicilios();
  }
  async cargarDomicilios(event?: InfiniteScrollCustomEvent) {
      const loading = await this.loadingCtrl.create({
          message: 'Cargando',
          spinner: 'bubbles',
      });
      await loading.present();
      const response = await axios({
          method: 'get',
          url: "http://localhost:8080/domicilio?expand=municipioNombre",
          withCredentials: true,
          headers: {
              'Accept': 'application/json'
          }
      }).then((response) => {
          this.domicilios = response.data;
          event?.target.complete();
      }).catch(function (error) {
          console.log(error);     
      });
      loading.dismiss();
  }
}

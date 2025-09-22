import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.page.html',
  styleUrls: ['./proveedor.page.scss'],
    standalone: false
})
export class ProveedorPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }

  proveedores: any=[];

  ngOnInit() {
    this.cargarProveedores();
  }

  async cargarProveedores(event?: InfiniteScrollCustomEvent) {
      const loading = await this.loadingCtrl.create({
          message: 'Cargando',
          spinner: 'bubbles',
      });
      await loading.present();
      const response = await axios({
          method: 'get',
          url: "http://localhost:8080/proveedor",
          withCredentials: true,
          headers: {
              'Accept': 'application/json'
          }
      }).then((response) => {
          this.proveedores = response.data;
          event?.target.complete();
      }).catch(function (error) {
          console.log(error);     
      });
      loading.dismiss();
  }
}

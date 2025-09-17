import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-cliente-etiqueta',
  templateUrl: './cliente-etiqueta.page.html',
  styleUrls: ['./cliente-etiqueta.page.scss'],
  standalone: false
})
export class ClienteEtiquetaPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
  ) { }
  clienteetiquetas: any=[];

  ngOnInit() {
    this.cargarClienteetiquetas();
  }
  async cargarClienteetiquetas(event?: InfiniteScrollCustomEvent) {
      const loading = await this.loadingCtrl.create({
          message: 'Cargando',
          spinner: 'bubbles',
      });
      await loading.present();
      const response = await axios({
          method: 'get',
          url: "http://localhost:8080/cliente-etiqueta?expand=clienteNombre, etiquetaNombre",
          withCredentials: true,
          headers: {
              'Accept': 'application/json'
          }
      }).then((response) => {
          this.clienteetiquetas = response.data;
          event?.target.complete();
      }).catch(function (error) {
          console.log(error);     
      });
      loading.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
  standalone: false
})
export class ProductoDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  producto:any=null;

  ngOnInit() {
    this.cargarProducto();
  }

  async cargarProducto() {
    const pro_id = this.route.snapshot.paramMap.get('pro_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://localhost:8080/productos/"+pro_id+"?expand=archivoRuta, categoriaNombre",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.producto = response.data;
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-proveedor-detalle',
  templateUrl: './proveedor-detalle.page.html',
  styleUrls: ['./proveedor-detalle.page.scss'],
  standalone: false
})
export class ProveedorDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  proveedor:any=null;

  ngOnInit() {
    this.cargarProveedor();
  }

  async cargarProveedor() {
    const prov_id = this.route.snapshot.paramMap.get('prov_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://localhost:8080/proveedors/"+prov_id+"?expand=domicilioNombre, municipioNombre, estatuNombre",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.proveedor = response.data;
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}

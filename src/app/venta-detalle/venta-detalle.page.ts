import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.page.html',
  styleUrls: ['./venta-detalle.page.scss'],
  standalone: false
})
export class VentaDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }
  venta:any=null;

  ngOnInit() {
    this.cargarVenta();
  }

  async cargarVenta() {
    const ven_id = this.route.snapshot.paramMap.get('ven_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://localhost:8080/ventas/"+ven_id+"?expand=clienteNombre,empleadoNombre,pagoReferencia,ventaDetalles.producto",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.venta = response.data;
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}

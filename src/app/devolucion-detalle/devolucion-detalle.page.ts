import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-devolucion-detalle',
  templateUrl: './devolucion-detalle.page.html',
  styleUrls: ['./devolucion-detalle.page.scss'],
  standalone: false
})
export class DevolucionDetallePage implements OnInit {

  devolucion: any = null; //Singular porque solo esta cargando un valor en especifico

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  ngOnInit(): void {
    this.cargarDevolucion();
  }

  async cargarDevolucion() {
    const devolucion_id = this.route.snapshot.paramMap.get('devolucion_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://localhost:8080/devolucions/" + devolucion_id + "?expand=detalleVenta,estatusVenta", //el ultimo parametro de la url es el controller que se creo en yii + el filtrado
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.devolucion = response.data; //La data que recibamos se guardara en el vector que creamos al inicio
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-color-detalle',
  templateUrl: './color-detalle.page.html',
  styleUrls: ['./color-detalle.page.scss'],
  standalone: false
})
export class ColorDetallePage implements OnInit {

  color: any = null; //Singular porque solo esta cargando un valor en especifico

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  ngOnInit(): void {
    this.cargarColor();
  }

  async cargarColor() {
    const color_id = this.route.snapshot.paramMap.get('color_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://localhost:8080/colors/" + color_id, //el ultimo parametro de la url es el controller que se creo en yii + el filtrado
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.color = response.data; //La data que recibamos se guardara en el vector que creamos al inicio
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}

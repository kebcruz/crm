import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-domicilio-detalle',
  templateUrl: './domicilio-detalle.page.html',
  styleUrls: ['./domicilio-detalle.page.scss'],
  standalone: false
})
export class DomicilioDetallePage implements OnInit {

  domicilio: any = null; //Singular porque solo esta cargando un valor en especifico

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  ngOnInit(): void {
    this.cargarDomicilio();
  }

  async cargarDomicilio() {
    const domicilio_id = this.route.snapshot.paramMap.get('domicilio_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://localhost:8080/domicilios/"+domicilio_id+"?expand=municipioNombre", //el ultimo parametro de la url es el controller que se creo en yii + el filtrado
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.domicilio = response.data; //La data que recibamos se guardara en el vector que creamos al inicio
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-empleado-detalle',
  templateUrl: './empleado-detalle.page.html',
  styleUrls: ['./empleado-detalle.page.scss'],
  standalone: false
})
export class EmpleadoDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController
  ) { }

  empleado:any=null;

  ngOnInit() {
    this.cargarEmpleado();
  }

  async cargarEmpleado() {
    const emp_id = this.route.snapshot.paramMap.get('emp_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://localhost:8080/empleados/"+emp_id+"?expand=archivoRuta, domicilioNombre, municipioNombre",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.empleado = response.data;
    }).catch(function (error) {
      console.log(error);
    });
    loading.dismiss();
  }

}

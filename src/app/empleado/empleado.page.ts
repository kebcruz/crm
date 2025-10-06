import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { EmpleadoCrearPage } from '../empleado-crear/empleado-crear.page';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.page.html',
  styleUrls: ['./empleado.page.scss'],
  standalone: false
})
export class EmpleadoPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
  ) { }
  empleados: any=[];

  ngOnInit() {
    this.cargarEmpleados();
  }

  async cargarEmpleados(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    const response = await axios({
      method: 'get',
      url: "http://localhost:8080/empleado?expand=archivoRuta",
      withCredentials: true,
      headers: {
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.empleados = response.data;
      event?.target.complete();
    }).catch(function (error) {
      console.log(error);     
    });
    loading.dismiss();
  }
  async new() {
    const paginaModal = await this.modalCtrl.create({
      component: EmpleadoCrearPage,
      breakpoints : [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
      this.cargarEmpleados();
    });
  }
}

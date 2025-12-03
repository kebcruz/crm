import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Empleados } from '../services/empleados';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-empleado-detalle',
  templateUrl: './empleado-detalle.page.html',
  styleUrls: ['./empleado-detalle.page.scss'],
  standalone: false
})
export class EmpleadoDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private empleadosService: Empleados
  ) { }

  empleado: any = null;

  getImageUrl(empleado: any): string {
    if (empleado?.archivo?.arc_ruta) {
      return environment.apiUrl + empleado.archivo.arc_ruta;
    }
    return 'assets/images/placeholder.jpg';
  }
  
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
    try {
<<<<<<< HEAD
      await this.empleadosService.detalle(emp_id, '?expand=archivo, domicilioNombre, municipioNombre, puestoNombre').subscribe(
=======
      await this.empleadosService.detalle(emp_id, '?expand=archivoRuta, domicilioNombre, municipioNombre, puestoNombre, estadoNombre').subscribe(
>>>>>>> 085643b2a48b261c60e1f4325fbb5d440e105a91
        response => {
          this.empleado = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
    loading.dismiss();
  }

}

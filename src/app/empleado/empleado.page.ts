import { Component, OnInit } from '@angular/core';
import { AlertController, InfiniteScrollCustomEvent, LoadingController, ModalController } from '@ionic/angular';
import axios from 'axios';
import { EmpleadoCrearPage } from '../empleado-crear/empleado-crear.page';
import { Router } from '@angular/router';
import { Empleados } from '../services/empleados';

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
    private alertCtrl : AlertController,
    private router: Router,
    private empleadosService: Empleados
  ) { }
  empleados: any=[];
  total: number=0;
  page: string='1';
  busqueda:string = '';
  baseUrl:string = "http://localhost:8080/empleado"

  ngOnInit() {
    this.cargarEmpleados();
    this.cargarTotal();
  }
  async cargarEmpleados() {
      const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
      });
      await loading.present();
      try {
        await this.empleadosService.listado('?page='+this.page+'&expand=archivoRuta', this.busqueda).subscribe(
          response => {
            this.empleados = response;
            this.cargarTotal();
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
  async editar(emp_id: number) {
    const paginaModal = await this.modalCtrl.create({
      component: EmpleadoCrearPage,
      componentProps: {
        'emp_id': emp_id
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
        this.cargarEmpleados();
    });
  }

  async alertEliminar(emp_id: number, emp_nombre: string) {
    const alert = await this.alertCtrl.create({
      header: 'Empleado',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar al empleado: ' + emp_nombre + '?',
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.eliminar(emp_id, emp_nombre);
          }
        }
      ]
    });
    await alert.present();
  }

  async eliminar(emp_id: number, emp_nombre: string) {
    try {
      await this.empleadosService.eliminar(emp_id).subscribe(
        response => {
          this.alertEliminado(emp_id, 'El empleado: ' + emp_nombre + ' ha sido eliminado');
        },
        error => {
          console.error('Error:', error);
          if (error.response?.status == 204) {
            this.alertEliminado(emp_id, 'El empleado: ' + emp_nombre + ' no se puede eliminar');
          }
          if (error.response?.status == 500) {
            this.alertEliminado(emp_id, 'El empleado: ' + emp_nombre + ' no se puede eliminar');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async alertEliminado(emp_id: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Empleado',
      subHeader: msg.includes('no se puede eliminar') ? 'Error al eliminar' : 'Eliminado',
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.regresar();
          },
        },
      ],
    });

    await alert.present();
  }

  private regresar() {
    this.router.navigate(['/empleado']).then(() => {
      window.location.reload();
    });
  }

  async cargarTotal() {
    try {
      await this.empleadosService.total(this.busqueda).subscribe(
        response => {
          this.total = response;
        },
        error => {
          console.error('Error:', error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  pagina(event:any) {
    this.page = event.target.innerText;
    this.cargarEmpleados();
  }
  handleInput(event:any) {
    this.busqueda = event.target.value.toLowerCase();
    this.cargarEmpleados();
  }
}


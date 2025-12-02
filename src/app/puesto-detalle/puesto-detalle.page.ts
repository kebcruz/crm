import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Puesto } from '../services/puesto';

@Component({
  selector: 'app-puesto-detalle',
  templateUrl: './puesto-detalle.page.html',
  styleUrls: ['./puesto-detalle.page.scss'],
  standalone: false
})
export class PuestoDetallePage implements OnInit {

  puesto: any = null; //Singular porque solo esta cargando un valor en especifico

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private puestoService: Puesto
  ) { }

  ngOnInit() {
    this.cargarPuesto();
  }

  async cargarPuesto() {
    const puesto_id = this.route.snapshot.paramMap.get('puesto_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.puestoService.detalle(puesto_id).subscribe(
        response => {
          this.puesto = response;
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

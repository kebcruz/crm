import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Estado } from '../services/estado';

@Component({
  selector: 'app-estado-detalle',
  templateUrl: './estado-detalle.page.html',
  styleUrls: ['./estado-detalle.page.scss'],
  standalone: false
})
export class EstadoDetallePage implements OnInit {

  estado: any = null; //Singular porque solo esta cargando un valor en especifico

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private estadoService: Estado
  ) { }

  ngOnInit() {
    this.cargarEstado();
  }

  async cargarEstado() {
    const estado_id = this.route.snapshot.paramMap.get('estado_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.estadoService.detalle(estado_id, '?expand=paisNombre').subscribe(
        response => {
          this.estado = response;
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

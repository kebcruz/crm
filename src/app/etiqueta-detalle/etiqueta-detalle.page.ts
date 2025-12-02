import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Etiqueta } from '../services/etiqueta';

@Component({
  selector: 'app-etiqueta-detalle',
  templateUrl: './etiqueta-detalle.page.html',
  styleUrls: ['./etiqueta-detalle.page.scss'],
  standalone: false
})
export class EtiquetaDetallePage implements OnInit {

  etiqueta: any = null; //Singular porque solo esta cargando un valor en especifico

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private etiquetaService: Etiqueta
  ) { }

  ngOnInit() {
    this.cargarEtiqueta();
  }

  async cargarEtiqueta() {
    const etiqueta_id = this.route.snapshot.paramMap.get('etiqueta_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.etiquetaService.detalle(etiqueta_id, '?expand=colorNombre').subscribe(
        response => {
          this.etiqueta = response;
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

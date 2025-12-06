import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Pago } from '../services/pago';

@Component({
  selector: 'app-pago-detalle',
  templateUrl: './pago-detalle.page.html',
  styleUrls: ['./pago-detalle.page.scss'],
  standalone: false
})
export class PagoDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private pagosService: Pago
  ) { }

  pago: any = null;

  ngOnInit() {
    this.cargarPago();
  }

  async cargarPago() {
    const pag_id = this.route.snapshot.paramMap.get('pag_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.pagosService.detalle(pag_id, '?expand=metodoNombre').subscribe(
        response => {
          this.pago = response;
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

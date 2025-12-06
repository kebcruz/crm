import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Estatu } from '../services/estatu';

@Component({
  selector: 'app-estatu-detalle',
  templateUrl: './estatu-detalle.page.html',
  styleUrls: ['./estatu-detalle.page.scss'],
  standalone: false
})
export class EstatuDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private estatusService: Estatu
  ) { }

  estatu: any = null;

  ngOnInit() {
    this.cargarEstatu();
  }

  async cargarEstatu() {
    const est_id = this.route.snapshot.paramMap.get('est_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.estatusService.detalle(est_id).subscribe(
        response => {
          this.estatu = response;
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

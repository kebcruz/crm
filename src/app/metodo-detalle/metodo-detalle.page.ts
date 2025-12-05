import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Metodo } from '../services/metodo';

@Component({
  selector: 'app-metodo-detalle',
  templateUrl: './metodo-detalle.page.html',
  styleUrls: ['./metodo-detalle.page.scss'],
  standalone: false
})
export class MetodoDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private metodosService: Metodo,
    private router: Router,
  ) { }

  metodo: any = null;

  ngOnInit(): void {
    this.cargarMetodo();
  }

 async cargarMetodo() {
    const met_id = this.route.snapshot.paramMap.get('met_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.metodosService.detalle(met_id).subscribe(
        response => {
          this.metodo = response;
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

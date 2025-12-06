import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Ventas } from '../services/ventas';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.page.html',
  styleUrls: ['./venta-detalle.page.scss'],
  standalone: false
})
export class VentaDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private ventasService: Ventas
  ) { }

  venta:any=null;

  ngOnInit() {
    this.cargarVenta();
  }

  async cargarVenta() {
    const ven_id = this.route.snapshot.paramMap.get('ven_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.ventasService.detalle(ven_id, '?expand=clienteNombre, empleadoNombre, pagoReferencia, ventaDetalles.producto').subscribe(
        response => {
          this.venta = response;
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

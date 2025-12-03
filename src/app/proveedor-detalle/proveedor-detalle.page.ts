import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Proveedor } from '../services/proveedor';

@Component({
  selector: 'app-proveedor-detalle',
  templateUrl: './proveedor-detalle.page.html',
  styleUrls: ['./proveedor-detalle.page.scss'],
  standalone: false
})
export class ProveedorDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private proveedoresService: Proveedor,
  ) { }

  proveedor: any = null;

  ngOnInit() {
    this.cargarProveedor();
  }


  async cargarProveedor() {
    const prov_id = this.route.snapshot.paramMap.get('prov_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.proveedoresService.detalle(prov_id, '?expand=domicilioNombre, municipioNombre, estatuNombre, estadoNombre').subscribe(
        response => {
          this.proveedor = response;
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

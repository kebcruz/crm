import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Productos } from '../services/productos';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
  standalone: false
})
export class ProductoDetallePage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private productosService: Productos
  ) { }

  producto:any=null;

  ngOnInit() {
    this.cargarProducto();
  }

  async cargarProducto() {
    const pro_id = this.route.snapshot.paramMap.get('pro_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.productosService.detalle(pro_id, '?expand=archivoRuta, categoriaNombre, proveedorNombre, colorNombre, estatuNombre').subscribe(
        response => {
          this.producto = response;
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

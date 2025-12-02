import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Productos } from '../services/productos';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.page.html',
  styleUrls: ['./producto-detalle.page.scss'],
  standalone: false
})
export class ProductoDetallePage implements OnInit {

  producto: any = null;

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private productosService: Productos
  ) { }

  ngOnInit() {
    this.cargarProducto();
  }

  getImageUrl(producto: any): string {
    if (producto?.archivo?.arc_ruta) {
      return environment.apiUrl + producto.archivo.arc_ruta;
    }
    return 'assets/images/placeholder.jpg';
  }

  async cargarProducto() {
    const pro_id = this.route.snapshot.paramMap.get('pro_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.productosService.detalle(pro_id, '?expand=archivo, categoriaNombre, proveedorNombre, colorNombre, estatuNombre').subscribe(
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Categoria } from '../services/categoria';

@Component({
  selector: 'app-categoria-detalle',
  templateUrl: './categoria-detalle.page.html',
  styleUrls: ['./categoria-detalle.page.scss'],
  standalone: false
})
export class CategoriaDetallePage implements OnInit {

  categoria: any = null; //Singular porque solo esta cargando un valor en especifico

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private categoriaServices: Categoria
  ) { }

  ngOnInit(): void {
    this.cargarCategoria();
  }

  async cargarCategoria() {
    const categoria_id = this.route.snapshot.paramMap.get('categoria_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.categoriaServices.detalle(categoria_id, '?expand=carrera').subscribe(
        response => {
          this.categoria = response;
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

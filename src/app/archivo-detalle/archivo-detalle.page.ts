import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Archivo } from '../services/archivo';

@Component({
  selector: 'app-archivo-detalle',
  templateUrl: './archivo-detalle.page.html',
  styleUrls: ['./archivo-detalle.page.scss'],
  standalone: false
})
export class ArchivoDetallePage implements OnInit {

  archivo: any = null; //Singular porque solo esta cargando un valor en especifico

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private archivoService: Archivo
  ) { }

  ngOnInit() {
    this.cargarArchivo();
  }

  async cargarArchivo() {
    const archivo_id = this.route.snapshot.paramMap.get('archivo_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.archivoService.detalle(archivo_id).subscribe(
        response => {
          this.archivo = response;
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

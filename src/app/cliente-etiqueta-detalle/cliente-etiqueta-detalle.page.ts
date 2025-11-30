import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ClienteEtiqueta } from '../services/cliente-etiqueta';

@Component({
  selector: 'app-cliente-etiqueta-detalle',
  templateUrl: './cliente-etiqueta-detalle.page.html',
  styleUrls: ['./cliente-etiqueta-detalle.page.scss'],
  standalone: false
})
export class ClienteEtiquetaDetallePage implements OnInit {

  clienteEtiqueta: any = null; //Singular porque solo esta cargando un valor en especifico

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private cliEtiService: ClienteEtiqueta
  ) { }

  ngOnInit(): void {
    this.cargarClienteEtiqueta();
  }

  async cargarClienteEtiqueta() {
    const cliente_detalle_id = this.route.snapshot.paramMap.get('cliente_detalle_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.cliEtiService.detalle(cliente_detalle_id, '?expand=clienteNombre,etiquetaNombre').subscribe(
        response => {
          this.clienteEtiqueta = response;
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

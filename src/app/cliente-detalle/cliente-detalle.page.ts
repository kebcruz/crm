import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';
import { Cliente } from '../services/cliente';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.page.html',
  styleUrls: ['./cliente-detalle.page.scss'],
  standalone: false
})
export class ClienteDetallePage implements OnInit {

  cliente: any = null;

  constructor(
    private route: ActivatedRoute,
    private loading: LoadingController,
    private clienteService: Cliente
  ) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  async cargarCliente() {
    const cliente_id = this.route.snapshot.paramMap.get('cliente_id');
    const loading = await this.loading.create({
      message: 'Cargando',
      spinner: 'bubbles',
    });
    await loading.present();
    try {
      await this.clienteService.detalle(cliente_id, '?expand=domicilioNombre, municipioNombre').subscribe(
        response => {
          this.cliente = response;
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

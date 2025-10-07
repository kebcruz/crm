import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentaDetallePageRoutingModule } from './venta-detalle-routing.module';

import { VentaDetallePage } from './venta-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentaDetallePageRoutingModule
  ],
  declarations: [VentaDetallePage]
})
export class VentaDetallePageModule {}

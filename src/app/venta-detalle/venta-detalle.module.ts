import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentaDetallePageRoutingModule } from './venta-detalle-routing.module';

import { VentaDetallePage } from './venta-detalle.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentaDetallePageRoutingModule,
    ToolbarModule
  ],
  declarations: [VentaDetallePage]
})
export class VentaDetallePageModule {}

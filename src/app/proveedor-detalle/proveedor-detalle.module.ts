import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedorDetallePageRoutingModule } from './proveedor-detalle-routing.module';

import { ProveedorDetallePage } from './proveedor-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedorDetallePageRoutingModule
  ],
  declarations: [ProveedorDetallePage]
})
export class ProveedorDetallePageModule {}

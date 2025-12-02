import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuestoDetallePageRoutingModule } from './puesto-detalle-routing.module';

import { PuestoDetallePage } from './puesto-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuestoDetallePageRoutingModule
  ],
  declarations: [PuestoDetallePage]
})
export class PuestoDetallePageModule {}

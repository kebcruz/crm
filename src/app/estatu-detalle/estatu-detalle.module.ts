import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstatuDetallePageRoutingModule } from './estatu-detalle-routing.module';

import { EstatuDetallePage } from './estatu-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstatuDetallePageRoutingModule
  ],
  declarations: [EstatuDetallePage]
})
export class EstatuDetallePageModule {}

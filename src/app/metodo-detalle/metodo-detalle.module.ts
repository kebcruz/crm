import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetodoDetallePageRoutingModule } from './metodo-detalle-routing.module';

import { MetodoDetallePage } from './metodo-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetodoDetallePageRoutingModule
  ],
  declarations: [MetodoDetallePage]
})
export class MetodoDetallePageModule {}

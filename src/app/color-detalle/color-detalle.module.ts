import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorDetallePageRoutingModule } from './color-detalle-routing.module';

import { ColorDetallePage } from './color-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorDetallePageRoutingModule
  ],
  declarations: [ColorDetallePage]
})
export class ColorDetallePageModule {}

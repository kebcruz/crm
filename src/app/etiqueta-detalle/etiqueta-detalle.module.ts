import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtiquetaDetallePageRoutingModule } from './etiqueta-detalle-routing.module';

import { EtiquetaDetallePage } from './etiqueta-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtiquetaDetallePageRoutingModule
  ],
  declarations: [EtiquetaDetallePage]
})
export class EtiquetaDetallePageModule {}

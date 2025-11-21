import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivoDetallePageRoutingModule } from './archivo-detalle-routing.module';

import { ArchivoDetallePage } from './archivo-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivoDetallePageRoutingModule
  ],
  declarations: [ArchivoDetallePage]
})
export class ArchivoDetallePageModule {}

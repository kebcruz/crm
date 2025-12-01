import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomicilioDetallePageRoutingModule } from './domicilio-detalle-routing.module';

import { DomicilioDetallePage } from './domicilio-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomicilioDetallePageRoutingModule
  ],
  declarations: [DomicilioDetallePage]
})
export class DomicilioDetallePageModule {}

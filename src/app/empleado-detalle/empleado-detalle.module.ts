import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoDetallePageRoutingModule } from './empleado-detalle-routing.module';

import { EmpleadoDetallePage } from './empleado-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoDetallePageRoutingModule
  ],
  declarations: [EmpleadoDetallePage]
})
export class EmpleadoDetallePageModule {}

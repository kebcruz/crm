import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoDetallePageRoutingModule } from './empleado-detalle-routing.module';

import { EmpleadoDetallePage } from './empleado-detalle.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoDetallePageRoutingModule,
    ToolbarModule
  ],
  declarations: [EmpleadoDetallePage]
})
export class EmpleadoDetallePageModule {}

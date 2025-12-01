import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevolucionPageRoutingModule } from './devolucion-routing.module';

import { DevolucionPage } from './devolucion.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevolucionPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [DevolucionPage]
})
export class DevolucionPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoPageRoutingModule } from './estado-routing.module';

import { EstadoPage } from './estado.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [EstadoPage]
})
export class EstadoPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuestoPageRoutingModule } from './puesto-routing.module';

import { PuestoPage } from './puesto.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuestoPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [PuestoPage]
})
export class PuestoPageModule {}

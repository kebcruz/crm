import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivoPageRoutingModule } from './archivo-routing.module';

import { ArchivoPage } from './archivo.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivoPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [ArchivoPage]
})
export class ArchivoPageModule {}

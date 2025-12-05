import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetodoPageRoutingModule } from './metodo-routing.module';

import { MetodoPage } from './metodo.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetodoPageRoutingModule,
    ToolbarModule,
    ReactiveFormsModule,
    PaginacionModule
  ],
  declarations: [MetodoPage]
})
export class MetodoPageModule {}

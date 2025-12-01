import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoCrearPageRoutingModule } from './producto-crear-routing.module';

import { ProductoCrearPage } from './producto-crear.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoCrearPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProductoCrearPage]
})
export class ProductoCrearPageModule {}

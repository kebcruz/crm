import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductoPageRoutingModule } from './producto-routing.module';

import { ProductoPage } from './producto.page';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { PaginacionComponent } from '../components/paginacion/paginacion.component';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductoPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [ProductoPage]
})
export class ProductoPageModule {}

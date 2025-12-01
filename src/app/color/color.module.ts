import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorPageRoutingModule } from './color-routing.module';

import { ColorPage } from './color.page';
import { PaginacionModule } from '../components/paginacion/paginacion.module';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [ColorPage]
})
export class ColorPageModule {}

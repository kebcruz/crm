import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtiquetaPageRoutingModule } from './etiqueta-routing.module';

import { EtiquetaPage } from './etiqueta.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtiquetaPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [EtiquetaPage]
})
export class EtiquetaPageModule {}

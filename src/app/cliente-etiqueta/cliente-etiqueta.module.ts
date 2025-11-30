import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteEtiquetaPageRoutingModule } from './cliente-etiqueta-routing.module';

import { ClienteEtiquetaPage } from './cliente-etiqueta.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteEtiquetaPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [ClienteEtiquetaPage]
})
export class ClienteEtiquetaPageModule {}

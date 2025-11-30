import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteEtiquetaDetallePageRoutingModule } from './cliente-etiqueta-detalle-routing.module';

import { ClienteEtiquetaDetallePage } from './cliente-etiqueta-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteEtiquetaDetallePageRoutingModule
  ],
  declarations: [ClienteEtiquetaDetallePage]
})
export class ClienteEtiquetaDetallePageModule {}

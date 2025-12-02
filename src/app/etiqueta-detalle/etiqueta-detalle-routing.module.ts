import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtiquetaDetallePage } from './etiqueta-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: EtiquetaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtiquetaDetallePageRoutingModule {}

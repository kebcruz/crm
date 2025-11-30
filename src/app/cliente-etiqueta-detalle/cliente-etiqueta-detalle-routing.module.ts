import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteEtiquetaDetallePage } from './cliente-etiqueta-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteEtiquetaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteEtiquetaDetallePageRoutingModule {}

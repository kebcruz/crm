import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuestoDetallePage } from './puesto-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: PuestoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuestoDetallePageRoutingModule {}

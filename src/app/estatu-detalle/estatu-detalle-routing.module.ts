import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstatuDetallePage } from './estatu-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: EstatuDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstatuDetallePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomicilioDetallePage } from './domicilio-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: DomicilioDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomicilioDetallePageRoutingModule {}

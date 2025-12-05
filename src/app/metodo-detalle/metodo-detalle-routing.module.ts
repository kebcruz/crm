import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetodoDetallePage } from './metodo-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: MetodoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetodoDetallePageRoutingModule {}

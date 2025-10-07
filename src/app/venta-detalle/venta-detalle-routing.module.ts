import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentaDetallePage } from './venta-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: VentaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaDetallePageRoutingModule {}

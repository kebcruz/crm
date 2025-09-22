import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedorDetallePage } from './proveedor-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ProveedorDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedorDetallePageRoutingModule {}

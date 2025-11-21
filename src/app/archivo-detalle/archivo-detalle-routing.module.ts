import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchivoDetallePage } from './archivo-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ArchivoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchivoDetallePageRoutingModule {}

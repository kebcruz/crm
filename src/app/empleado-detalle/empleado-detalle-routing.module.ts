import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoDetallePage } from './empleado-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoDetallePageRoutingModule {}

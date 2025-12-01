import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorDetallePage } from './color-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: ColorDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorDetallePageRoutingModule {}

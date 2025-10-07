import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentaCrearPage } from './venta-crear.page';

const routes: Routes = [
  {
    path: '',
    component: VentaCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaCrearPageRoutingModule {}

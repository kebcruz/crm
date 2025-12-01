import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedorCrearPage } from './proveedor-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ProveedorCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedorCrearPageRoutingModule {}

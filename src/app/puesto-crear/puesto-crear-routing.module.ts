import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuestoCrearPage } from './puesto-crear.page';

const routes: Routes = [
  {
    path: '',
    component: PuestoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuestoCrearPageRoutingModule {}

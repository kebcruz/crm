import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetodoCrearPage } from './metodo-crear.page';

const routes: Routes = [
  {
    path: '',
    component: MetodoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetodoCrearPageRoutingModule {}

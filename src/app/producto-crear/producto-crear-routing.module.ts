import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductoCrearPage } from './producto-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ProductoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoCrearPageRoutingModule {}

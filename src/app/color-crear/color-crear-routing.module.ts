import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorCrearPage } from './color-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ColorCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorCrearPageRoutingModule {}

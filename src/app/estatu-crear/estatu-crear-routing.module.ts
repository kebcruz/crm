import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstatuCrearPage } from './estatu-crear.page';

const routes: Routes = [
  {
    path: '',
    component: EstatuCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstatuCrearPageRoutingModule {}

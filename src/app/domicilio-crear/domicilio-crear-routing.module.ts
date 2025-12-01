import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DomicilioCrearPage } from './domicilio-crear.page';

const routes: Routes = [
  {
    path: '',
    component: DomicilioCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DomicilioCrearPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArchivoCrearPage } from './archivo-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ArchivoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArchivoCrearPageRoutingModule {}

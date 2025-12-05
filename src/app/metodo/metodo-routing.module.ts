import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetodoPage } from './metodo.page';

const routes: Routes = [
  {
    path: '',
    component: MetodoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetodoPageRoutingModule {}

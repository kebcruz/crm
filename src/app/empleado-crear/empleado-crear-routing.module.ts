import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoCrearPage } from './empleado-crear.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoCrearPageRoutingModule {}

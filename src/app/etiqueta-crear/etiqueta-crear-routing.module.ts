import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtiquetaCrearPage } from './etiqueta-crear.page';

const routes: Routes = [
  {
    path: '',
    component: EtiquetaCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtiquetaCrearPageRoutingModule {}

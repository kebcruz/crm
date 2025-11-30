import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteEtiquetaCrearPage } from './cliente-etiqueta-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteEtiquetaCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteEtiquetaCrearPageRoutingModule {}

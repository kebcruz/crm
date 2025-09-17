import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteEtiquetaPage } from './cliente-etiqueta.page';

const routes: Routes = [
  {
    path: '',
    component: ClienteEtiquetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClienteEtiquetaPageRoutingModule {}

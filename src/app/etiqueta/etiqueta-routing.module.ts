import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EtiquetaPage } from './etiqueta.page';

const routes: Routes = [
  {
    path: '',
    component: EtiquetaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EtiquetaPageRoutingModule {}

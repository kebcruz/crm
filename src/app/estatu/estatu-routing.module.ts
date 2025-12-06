import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstatuPage } from './estatu.page';

const routes: Routes = [
  {
    path: '',
    component: EstatuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstatuPageRoutingModule {}

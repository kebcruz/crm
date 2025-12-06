import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstatuPageRoutingModule } from './estatu-routing.module';

import { EstatuPage } from './estatu.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstatuPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [EstatuPage]
})
export class EstatuPageModule {}

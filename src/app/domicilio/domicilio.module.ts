import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomicilioPageRoutingModule } from './domicilio-routing.module';

import { DomicilioPage } from './domicilio.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';
import { PaginacionModule } from '../components/paginacion/paginacion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomicilioPageRoutingModule,
    ToolbarModule,
    PaginacionModule
  ],
  declarations: [DomicilioPage]
})
export class DomicilioPageModule {}

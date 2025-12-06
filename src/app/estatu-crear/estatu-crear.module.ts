import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstatuCrearPageRoutingModule } from './estatu-crear-routing.module';

import { EstatuCrearPage } from './estatu-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstatuCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EstatuCrearPage]
})
export class EstatuCrearPageModule {}

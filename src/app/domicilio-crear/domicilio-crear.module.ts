import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomicilioCrearPageRoutingModule } from './domicilio-crear-routing.module';

import { DomicilioCrearPage } from './domicilio-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomicilioCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DomicilioCrearPage]
})
export class DomicilioCrearPageModule {}

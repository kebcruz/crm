import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuestoCrearPageRoutingModule } from './puesto-crear-routing.module';

import { PuestoCrearPage } from './puesto-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuestoCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PuestoCrearPage]
})
export class PuestoCrearPageModule {}

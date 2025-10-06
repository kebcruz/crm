import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoCrearPageRoutingModule } from './empleado-crear-routing.module';

import { EmpleadoCrearPage } from './empleado-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EmpleadoCrearPage]
})
export class EmpleadoCrearPageModule {}

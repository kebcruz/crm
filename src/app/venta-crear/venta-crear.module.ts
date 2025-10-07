import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentaCrearPageRoutingModule } from './venta-crear-routing.module';

import { VentaCrearPage } from './venta-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentaCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VentaCrearPage]
})
export class VentaCrearPageModule {}

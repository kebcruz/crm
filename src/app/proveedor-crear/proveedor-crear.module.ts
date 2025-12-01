import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedorCrearPageRoutingModule } from './proveedor-crear-routing.module';

import { ProveedorCrearPage } from './proveedor-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedorCrearPageRoutingModule
  ],
  declarations: [ProveedorCrearPage]
})
export class ProveedorCrearPageModule {}

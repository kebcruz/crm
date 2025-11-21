import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArchivoCrearPageRoutingModule } from './archivo-crear-routing.module';

import { ArchivoCrearPage } from './archivo-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArchivoCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ArchivoCrearPage]
})
export class ArchivoCrearPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorCrearPageRoutingModule } from './color-crear-routing.module';

import { ColorCrearPage } from './color-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ColorCrearPage]
})
export class ColorCrearPageModule {}

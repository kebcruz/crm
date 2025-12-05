import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetodoCrearPageRoutingModule } from './metodo-crear-routing.module';

import { MetodoCrearPage } from './metodo-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetodoCrearPageRoutingModule
  ],
  declarations: [MetodoCrearPage]
})
export class MetodoCrearPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtiquetaCrearPageRoutingModule } from './etiqueta-crear-routing.module';

import { EtiquetaCrearPage } from './etiqueta-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtiquetaCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EtiquetaCrearPage]
})
export class EtiquetaCrearPageModule {}

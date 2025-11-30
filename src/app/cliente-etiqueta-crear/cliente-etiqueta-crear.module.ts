import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteEtiquetaCrearPageRoutingModule } from './cliente-etiqueta-crear-routing.module';

import { ClienteEtiquetaCrearPage } from './cliente-etiqueta-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteEtiquetaCrearPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ClienteEtiquetaCrearPage]
})
export class ClienteEtiquetaCrearPageModule {}

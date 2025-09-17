import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClienteEtiquetaPageRoutingModule } from './cliente-etiqueta-routing.module';

import { ClienteEtiquetaPage } from './cliente-etiqueta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClienteEtiquetaPageRoutingModule
  ],
  declarations: [ClienteEtiquetaPage]
})
export class ClienteEtiquetaPageModule {}

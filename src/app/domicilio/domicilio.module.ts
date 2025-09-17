import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DomicilioPageRoutingModule } from './domicilio-routing.module';

import { DomicilioPage } from './domicilio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DomicilioPageRoutingModule
  ],
  declarations: [DomicilioPage]
})
export class DomicilioPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrescripcionPageRoutingModule } from './prescripcion-routing.module';

import { PrescripcionPage } from './prescripcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrescripcionPageRoutingModule
  ],
  declarations: [PrescripcionPage]
})
export class PrescripcionPageModule {}

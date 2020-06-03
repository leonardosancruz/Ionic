import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrescripcionDetallePageRoutingModule } from './prescripcion-detalle-routing.module';

import { PrescripcionDetallePage } from './prescripcion-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrescripcionDetallePageRoutingModule
  ],
  declarations: [PrescripcionDetallePage]
})
export class PrescripcionDetallePageModule {}

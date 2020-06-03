import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrescripcionDetallePage } from './prescripcion-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: PrescripcionDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrescripcionDetallePageRoutingModule {}

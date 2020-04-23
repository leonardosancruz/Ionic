import { Component, OnInit, ViewChild } from '@angular/core';
import { Medicamento } from '../interfaces/medicamento';
import { MedicamentoService } from '../api/medicamento.service';
import { IonicSelectableComponent } from 'ionic-selectable';

@Component({
  selector: 'app-medicamento',
  templateUrl: './medicamento.page.html',
  styleUrls: ['./medicamento.page.scss'],
})
export class MedicamentoPage implements OnInit {
  medicamento: Medicamento;
  medicamentos: Medicamento;
  constructor(
    private MedicamentoService: MedicamentoService
  ) {

  }
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
  async ngOnInit() {
    console.log("Medicamento= " + this.medicamento);
    (await this.MedicamentoService.getAll()).subscribe(medicamentos => { this.medicamentos = medicamentos; console.log(this.medicamentos); });
  }

}

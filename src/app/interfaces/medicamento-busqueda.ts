import { Medicamento } from './medicamento';
import { MedicamentoATC } from './medicamento-atc';

export interface MedicamentoBusqueda {
    disponible: boolean;
    medicamentoATC: MedicamentoATC;
    datosMedicamento: Medicamento;
    cantidadPrescrita: number;
}

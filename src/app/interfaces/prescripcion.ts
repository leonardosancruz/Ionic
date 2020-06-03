import { Medicamento } from './medicamento';
import { Usuario } from './usuario';
import { Ips } from './ips';

export interface Prescripcion {
    idusuario: number;
    usuario: Usuario[];
    idips: number;
    ips: Ips[];
    idusuariomedico: number;
    fechacreacion: Date;
    fechamodificacion: Date;
    idprescripcion: number;
    medicamentos: Medicamento[];
    estado: string;
}

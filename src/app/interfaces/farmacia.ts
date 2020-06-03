import { MedicamentoBusqueda } from './medicamento-busqueda';

export interface Farmacia {
    farmacia: {
        nit: number;
        estado: string;
        dv: string;
        telefono: number;
        razonsocial: string;
        direccion: string;
        medicamentoBusqueda: MedicamentoBusqueda[];
        departamento: {
            idpais: string;
            descripcion: string;
            iddepartamento: string;
        }
        ciudad: {
            idciudad: string;
            descripcion: string;
            iddepartamento: string;
        }
    }
}

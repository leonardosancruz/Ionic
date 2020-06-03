import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Farmacia } from '../interfaces/farmacia';
import { Divipola } from '../interfaces/divipola';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  private urlApi = 'http://40.71.4.4:8080/MediExpress';
  constructor(private http: HttpClient) { }

  async getBusquedaPrescripcion(idPrescripcion, IdCiudad) {
    const path = `${this.urlApi}/busqueda/getBusqueda?TipoObjeto=1&TipoBusqueda=${idPrescripcion}&IdCiudad=${IdCiudad}&Cantidad=0`;
    return this.http.get<Farmacia[]>(path);
  }

  async getBusquedaMedicamento(idPrescripcion,Medicamento, IdCiudad, Cantidad) {
    const path = `${this.urlApi}/busqueda/getBusqueda?TipoObjeto=1&TipoBusqueda=${idPrescripcion},${Medicamento}&IdCiudad=${IdCiudad}&Cantidad=${Cantidad}`;
    return this.http.get<Farmacia[]>(path);
  }

  async getBusquedaFarmaciasMedicamento(Medicamento, IdCiudad, Cantidad) {
    const path = `${this.urlApi}/busqueda/getBusqueda?TipoObjeto=2&TipoBusqueda=${Medicamento}&IdCiudad=${IdCiudad}&Cantidad=${Cantidad}`;
    return this.http.get<Farmacia[]>(path);
  }

  async getBusquedaCiudadDivipola(latitud, longitud) {
    const path = `https://geocode.xyz/${latitud},${longitud}?json=1`;
    return this.http.get<Divipola>(path);
  }
}

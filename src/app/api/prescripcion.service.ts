import { Injectable } from '@angular/core';
import { Prescripcion } from '../interfaces/prescripcion';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrescripcionService {

  private urlApi = 'http://40.71.4.4:8080/MediExpress';
  constructor(private http: HttpClient) { }

  async getPrescripcionUsuario(idUsuario) {
    const path = `${this.urlApi}/prescripcion/getPrescripcionUsuario?idUsuario=${idUsuario}`;
    return this.http.get<Prescripcion>(path);
  }
}

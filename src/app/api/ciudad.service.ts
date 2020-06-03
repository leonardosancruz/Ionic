import { Injectable } from '@angular/core';
import { Ciudad } from '../interfaces/ciudad';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private urlApi = 'http://40.71.4.4:8080/MediExpress';
  constructor(private http: HttpClient) { }

  // async getAll() {
  //   const path = `${this.urlApi}/ciudad/getAll`;
  //   return this.http.get<Ciudad>(path);
  // }

  async getAllbyDepartamento(departamento) {
    const path = `${this.urlApi}/ciudad/getAllbyDepartamento?Departamento=${departamento}`;
    return this.http.get<Ciudad>(path);
  }
}

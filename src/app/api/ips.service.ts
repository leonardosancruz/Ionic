import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ips } from '../interfaces/ips';

@Injectable({
  providedIn: 'root'
})
export class IpsService {

  private urlApi = 'http://40.71.4.4:8080/MediExpress';
  constructor(private http: HttpClient) { }

  async getAll() {
    const path = `${this.urlApi}/ips/getAll`;
    return this.http.get<Ips>(path);
  }

  async getAllbyCiudad(valor) {
    const path = `${this.urlApi}/ips/getAllbyCiudad?Ciudad=${valor}`;
    return this.http.get<Ips>(path);
  }

  async getByIdIps(valor) {
    const path = `${this.urlApi}/ips/getByIdIPS?IdIPS=${valor}`;
    return this.http.get<Ips>(path);
  }
}

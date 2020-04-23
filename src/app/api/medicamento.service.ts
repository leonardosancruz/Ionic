import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicamento } from '../interfaces/medicamento';

@Injectable({
  providedIn: 'root'
})
export class MedicamentoService {

  private urlApi = 'http://40.71.4.4:8080/MediExpress';
  constructor(private http: HttpClient) { }

  async getAll() {
    const path = `${this.urlApi}/medicamento/getAll`;
    return this.http.get<Medicamento>(path);
  }
  
}

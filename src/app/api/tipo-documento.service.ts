import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoDocumento } from '../interfaces/tipo-documento';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  private urlApi = 'http://40.71.4.4:8080/MediExpress';
  constructor(private http: HttpClient) { }

  async getAll() {
    const path = `${this.urlApi}/tipoDocumento/getAll`;
    return this.http.get<TipoDocumento>(path);
  }
}

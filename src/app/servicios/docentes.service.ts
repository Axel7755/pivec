import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  private baseUrl = 'http://localhost:8080/api/docentes';

  constructor(private http: HttpClient) { }

  createDocente(docente: any): Observable<any> {
    return this.http.post(this.baseUrl, docente);
  }
  obtenerDocente(idDocente: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${idDocente}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {
  private baseUrl = `${environment.apiUrl}:8080/api/docentes`;

  constructor(private http: HttpClient) { }

  createDocente(docente: any): Observable<any> {
    return this.http.post(this.baseUrl, docente);
  }
  obtenerDocente(idDocente: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${idDocente}`);
  }
}

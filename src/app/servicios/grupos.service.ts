import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private baseUrl = 'http://localhost:8080/api/grupos';

  constructor(private http: HttpClient) { }

  createGrupo(grupo: any): Observable<any> {
    return this.http.post(this.baseUrl, grupo);
  }
  getGruposByDocente(docenteId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${docenteId}`);
  }
}

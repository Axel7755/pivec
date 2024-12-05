import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private baseUrl = `${environment.apiUrl}:8080/api/grupos`;

  constructor(private http: HttpClient) { }

  createGrupo(grupo: any): Observable<any> {
    return this.http.post(this.baseUrl, grupo);
  }
  getGruposByDocente(docenteId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${docenteId}`);
  }
  getGruposByID(g_idmaterias: string, idgrupos: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${g_idmaterias}/${idgrupos}`);
  }
}

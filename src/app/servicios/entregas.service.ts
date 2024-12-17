import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {
  private baseUrl = `${environment.apiUrl}:8080/api/entregas`;

  constructor(private http: HttpClient) { }
  
  createEntrega(entrega: any): Observable<any> {
    return this.http.post(this.baseUrl, entrega);
  }

  obtenerEntregasByTareaAlumno(e_idtareas: string, e_boleta: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${e_idtareas}/${e_boleta}`);
  }

  obtenerEntregasByTarea(e_idtareas: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${e_idtareas}`);
  }

  editarEntrega(e_idtareas: string, e_boleta: string, entrega: any): Observable<any>{
    return this.http.put(`${this.baseUrl}/${e_idtareas}/${e_boleta}`, entrega);
  }
  deleteEntrega(e_idtareas: string, e_boleta: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${e_idtareas}/${e_boleta}`);
 }
}

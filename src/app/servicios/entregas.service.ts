import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {
  private baseUrl = 'http://localhost:8080/api/entregas';

  constructor(private http: HttpClient) { }
  
  createEntrega(entrega: any): Observable<any> {
    return this.http.post(this.baseUrl, entrega);
  }

  obtenerEntregasByTareaAlumno(e_idtareas: string, e_boleta: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${e_idtareas}/${e_boleta}`);
  }
}

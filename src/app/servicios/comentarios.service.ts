import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private baseUrl = `${environment.apiUrl}:8080/api/comentarios`;

  constructor(private http: HttpClient) { }

  createComentario(comentario: any): Observable<any> {
    return this.http.post(this.baseUrl, comentario);
  }
  getComentariosEntrega(c_idtareas: string, c_boleta:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${c_idtareas}/${c_boleta}`);
  }
}

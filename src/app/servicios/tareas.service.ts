import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private baseUrl = `${environment.apiUrl}:8080/api/tareas`;


  constructor(private http: HttpClient) { }

  createTarea(tarea: any): Observable<any> {
    return this.http.post(this.baseUrl, tarea);
  }

  findTareaByGrupo(ta_idmaterias: string, ta_idgrupos: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ta_idmaterias}/${ta_idgrupos}`);
  }

  findTareaByGrupoP(ta_idmaterias: string, ta_idgrupos: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/P/${ta_idmaterias}/${ta_idgrupos}`);
  }
  findTareaByGrupoV(ta_idmaterias: string, ta_idgrupos: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/V/${ta_idmaterias}/${ta_idgrupos}`);
  }
  findTareaById(ta_idmaterias: string, ta_idgrupos: string, idtareas: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${idtareas}/${ta_idmaterias}/${ta_idgrupos}`);
  }

  deleteTarea(idtareas: string, ta_idmaterias: string, ta_idgrupos: string): Observable<any> {
     return this.http.delete(`${this.baseUrl}/${idtareas}/${ta_idmaterias}/${ta_idgrupos}`);
  }

  updateTarea(tarea: any, idtareas: string, ta_idmaterias: string, ta_idgrupos: string): Observable<any>{
    return this.http.put(`${this.baseUrl}/${idtareas}/${ta_idmaterias}/${ta_idgrupos}`,tarea);
  }
}

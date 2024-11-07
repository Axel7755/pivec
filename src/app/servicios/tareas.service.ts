import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private baseUrl = 'http://localhost:8080/api/tareas';

  constructor(private http: HttpClient) { }

  createTarea(tarea: any): Observable<any> {
    return this.http.post(this.baseUrl, tarea);
  }

  findTareaByGrupo(ta_idmaterias: string, ta_idgrupos: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ta_idmaterias}/${ta_idgrupos}`);
  }
  findTareaById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  deleteTarea(idtareas: string, ta_idmaterias: string, ta_idgrupos: string): Observable<any> {
     return this.http.delete(`${this.baseUrl}/${idtareas}/${ta_idmaterias}/${ta_idgrupos}`);
  }
}

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

  findTareaByIds(material: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/findByName/${material}`);
  }
  findMateriaById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
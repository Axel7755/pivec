import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private baseUrl = `${environment.apiUrl}:8080/api/materias`;

  constructor(private http: HttpClient) { }

  createMateria(materia: any): Observable<any> {
    return this.http.post(this.baseUrl, materia);
  }

  findMateriaByName(material: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/findByName/${material}`);
  }
  findMateriaById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}

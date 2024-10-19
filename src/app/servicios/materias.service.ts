import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private baseUrl = 'http://localhost:8080/api/materias';

  constructor(private http: HttpClient) { }

  createMateria(materia: any): Observable<any> {
    return this.http.post(this.baseUrl, materia);
  }
}

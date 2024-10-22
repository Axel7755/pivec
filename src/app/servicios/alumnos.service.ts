import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private baseUrl = 'http://localhost:8080/api/alumnos';

  constructor(private http: HttpClient) { }

  createAlumno(alumno: any): Observable<any> {
    return this.http.post(this.baseUrl, alumno);
  }
  obtenerAlumno(idAlumno: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${idAlumno}`);
  }
}

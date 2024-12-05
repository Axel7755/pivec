import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private baseUrl = `${environment.apiUrl}:8080/api/alumnos`;

  constructor(private http: HttpClient) { }

  createAlumno(alumno: any): Observable<any> {
    return this.http.post(this.baseUrl, alumno);
  }
  obtenerAlumno(idAlumno: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${idAlumno}`);
  }
}

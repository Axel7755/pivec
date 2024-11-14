import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GruposAlumnosService {
  private baseUrl = 'http://localhost:8080/api/gruposAlumnos';

  constructor(private http: HttpClient) { }

  createAsigGrupoAlumno(grupo_alumno: any): Observable<any> {    
    console.log(grupo_alumno)
    return this.http.post(this.baseUrl, grupo_alumno);
  }

  findGruposAlumno(ga_boleta: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${ga_boleta}`);
  }
}

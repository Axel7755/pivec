import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private baseUrl = `${environment.apiUrl}:8080/api/horarios`;

  constructor(private http: HttpClient) { }

  createHorario(horario: any): Observable<any> {
    return this.http.post(this.baseUrl, horario);
  }
}

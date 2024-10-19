import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {
  private baseUrl = 'http://localhost:8080/api/horarios';

  constructor(private http: HttpClient) { }

  createHorario(horario: any): Observable<any> {
    return this.http.post(this.baseUrl, horario);
  }
}

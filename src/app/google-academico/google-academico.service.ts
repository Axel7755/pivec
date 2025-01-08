import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class GoogleAcademicoService {
  private apiUrl = `${environment.apiUrl}:8080/search`;

  constructor(private http: HttpClient) { }

  searchScholar(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${encodeURIComponent(query)}`);
  }
}

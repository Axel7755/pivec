import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleAcademicoService {
  private apiUrl = 'https://serpapi.com/search.json?engine=google_scholar&api_key=285f0000d24c1d580fa2ac8c40d920ecb2e3e4eaa2846de0594a04885a0de593';

  constructor(private http: HttpClient) { }

  searchScholar(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${encodeURIComponent(query)}`);
  }
}
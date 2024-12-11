import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleAcademicoService {
  private apiUrl = 'https://serpapi.com/search.json?engine=google_scholar&api_key=d968a88a4a3215da3da618e6836d8e9b6721255dc6f9e4bed38aa332ee118b9e';

  constructor(private http: HttpClient) { }

  searchScholar(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?q=${encodeURIComponent(query)}`);
  }
}
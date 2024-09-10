import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleAcademicoService {
  private apiUrl = '/api/search.json?engine=google_scholar&q=html&api_key=285f0000d24c1d580fa2ac8c40d920ecb2e3e4eaa2846de0594a04885a0de593';

  constructor(private http: HttpClient) { }

  searchScholar(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

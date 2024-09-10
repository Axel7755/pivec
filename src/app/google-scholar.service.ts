import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleScholarService {

  private apiKey = 'TU_API_KEY';
  private cx = 'TU_CX';

  constructor(private http: HttpClient) {}

  search(query: string) {
    const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${this.apiKey}&cx=${this.cx}`;
    return this.http.get(url);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AvisosService {

  private baseUrl = `${environment.apiUrl}:8080/api/avisos`;

  constructor(private http: HttpClient) { }

  createAviso(aviso: any): Observable<any> {
    return this.http.post(this.baseUrl, aviso);
  }
  getAvisos(av_idmaterias: string, av_idgrupos:string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${av_idmaterias}/${av_idgrupos}`);
  }
}

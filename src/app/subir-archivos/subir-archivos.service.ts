import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {
  private baseUrl = 'http://localhost:8080/api/upload';  // URL base de tu API

  constructor(private http: HttpClient) { }

  // Método para cargar un archivo
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });

    const req = new HttpRequest('POST', this.baseUrl, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  // Método para obtener la lista de archivos
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}

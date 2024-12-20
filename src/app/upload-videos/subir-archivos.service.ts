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
  upload(file: File, idgrupos: string, g_idmaterias: string, idtarea: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    formData.append('type', file.type);
    formData.append('size', file.size.toString());
    formData.append('lastModified', file.lastModified.toString());
    
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
  
    const req = new HttpRequest('POST', `${this.baseUrl}/tareas/${g_idmaterias}/${idgrupos}/${idtarea}`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    });
  
    console.log('Datos del archivo enviados:', formData);
  
    return this.http.request(req);
  }

  uploadEntrega(file: File, idgrupos: string, g_idmaterias: string, idtarea: string, boletaAl: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    formData.append('type', file.type);
    formData.append('size', file.size.toString());
    formData.append('lastModified', file.lastModified.toString());
    
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
  
    const req = new HttpRequest('POST', `${this.baseUrl}/entregas/${g_idmaterias}/${idgrupos}/${idtarea}/${boletaAl}`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    });
  
    console.log('Datos del archivo enviados:', formData);
  
    return this.http.request(req);
  }
  

  // Método para obtener la lista de archivos
  getFiles(idgrupos: string, g_idmaterias: string, idtarea: string): Observable<any> {
    console.log(`${this.baseUrl}/tareas/${g_idmaterias}/${idgrupos}/${idtarea}`);
    return this.http.get(`${this.baseUrl}/tareas/${g_idmaterias}/${idgrupos}/${idtarea}`);
  }

  // Método para eliminar un archivo 
  deleteFile(idgrupos: string, g_idmaterias: string, idtarea: string, fileName: string): Observable<any> { 
    return this.http.delete(`${this.baseUrl}/tareas/${g_idmaterias}/${idgrupos}/${idtarea}/${fileName}`
      
    ); }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {
  private baseUrl = `${environment.apiUrl}:8080/api/upload`;

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


  uploadAviso(file: File, idgrupos: string, g_idmaterias: string, idtarea: string): Observable<HttpEvent<any>> {
    console.log('Datos del archivo:', file);
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    formData.append('type', file.type);
    formData.append('size', file.size.toString());
    formData.append('lastModified', file.lastModified.toString());
    
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
  
    const req = new HttpRequest('POST', `${this.baseUrl}/avisos/${g_idmaterias}/${idgrupos}/${idtarea}`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    });
  
    console.log('Datos del archivo enviados:', formData);
  
    return this.http.request(req);
  }

  uploadVideo(file: File, g_idmaterias: string): Observable<HttpEvent<any>> {
    console.log('Datos del archivo:', file);
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);
    formData.append('type', file.type);
    formData.append('size', file.size.toString());
    formData.append('lastModified', file.lastModified.toString());
    
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
  
    const req = new HttpRequest('POST', `${this.baseUrl}/videos/${g_idmaterias}`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    });
  
    console.log('Datos del archivo enviados:', formData);
  
    return this.http.request(req);
  }
  

  // Método para obtener la lista de archivos
  getFiles(idgrupos: string, g_idmaterias: string, idtarea: string): Observable<any> {
    //console.log(`${this.baseUrl}/tareas/${g_idmaterias}/${idgrupos}/${idtarea}`);
    return this.http.get(`${this.baseUrl}/tareas/${g_idmaterias}/${idgrupos}/${idtarea}`);
  }

  getFilesEntrega(idgrupos: string, g_idmaterias: string, idtarea: string, boleta:string): Observable<any> {
    //console.log(`${this.baseUrl}/entregas/${g_idmaterias}/${idgrupos}/${idtarea}/${boleta}`);
    return this.http.get(`${this.baseUrl}/entregas/${g_idmaterias}/${idgrupos}/${idtarea}/${boleta}`);
  }

  getFilesAvisos(idgrupos: string, g_idmaterias: string, idtarea: string): Observable<any> {
    //console.log(`${this.baseUrl}/tareas/${g_idmaterias}/${idgrupos}/${idtarea}`);
    return this.http.get(`${this.baseUrl}/avisos/${g_idmaterias}/${idgrupos}/${idtarea}`);
  }

  // Método para eliminar un archivo 
  deleteFile(idgrupos: string, g_idmaterias: string, idtarea: string, fileName: string): Observable<any> { 
    return this.http.delete(`${this.baseUrl}/tareas/${g_idmaterias}/${idgrupos}/${idtarea}/${fileName}`
      
    ); }

     // Método para eliminar un archivo 
  deleteFileEntrega(idgrupos: string, g_idmaterias: string, idtarea: string, boleta: string, fileName: string,): Observable<any> { 
    return this.http.delete(`${this.baseUrl}/entregas/${g_idmaterias}/${idgrupos}/${idtarea}/${boleta}/${fileName}`
      
    ); }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private baseUrl = `${environment.apiUrl}:8080/api/videos`;

  constructor(private http: HttpClient) { }

  createVideo(video: any): Observable<any> {
    return this.http.post(this.baseUrl, video);
  }
  getVideosByMateria(v_idmaterias: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${v_idmaterias}`);
  }
  deleteVideo(v_idmaterias: string, v_boleta: string, idvideos: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${v_idmaterias}/${v_boleta}/${idvideos}`);
 }
}

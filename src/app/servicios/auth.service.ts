import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}:8080/api/auth`;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {}

  login(identificador: string, password: string): Observable<any> {
    //alert(this.baseUrl);
    return this.http.post(`${this.baseUrl}/`, { identificador, password })
      .pipe(
        catchError(error => {
          console.error('Error al iniciar sesión', error);
          return of(null);
        })
      );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user') !== null;
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).token : null;
    }
    return null;
  }

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).role : null;
    }
    return null;
  }

  getUserId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).id : null;
    }
    return null;
  }


  sendResetEmail(correo: string): Observable<any> { 
    return this.http.post(`${this.baseUrl}/sendResetEmail`, { correo, urlbase: environment.apiUrl});
  }

  resetPassword(ident: string, token: string,  newPassword: string): Observable<any> { 
    return this.http.post(`${this.baseUrl}/resetPassword/${ident}/${token}`, { newPassword }); 
  }
}

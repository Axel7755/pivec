import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth'; // URL de tu backend

  constructor(private http: HttpClient) { }

  // El método login debería devolver un Observable al componente que lo llame
  login(identificador: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, { identificador, password })
      .pipe(
        catchError(error => {
          console.error('Error al iniciar sesión', error);
          return of(null);  // Retornar null en caso de error
        })
      );
  }

  // Método logout para eliminar el token del localStorage
  logout() {
    localStorage.removeItem('user');
  }

  // Verificar si hay un usuario logueado
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  // Obtener el token JWT almacenado
  getToken(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : null;
  }
}

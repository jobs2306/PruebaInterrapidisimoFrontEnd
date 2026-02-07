import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.api}/auth/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.datos.token);
          localStorage.setItem('nombre', res.datos.nombre);
        })
      );
  }

  get nombre() {
    return localStorage.getItem('nombre');
  }

  register(nombre: string, email: string, password: string) {
    return this.http.post<any>(
      `${this.api}/auth/registrar`,
      { nombre, email, password }
    );
  }

  logout() {
    localStorage.clear();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class MateriasService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerMaterias() {
    return this.http.get<any>(`${this.api}/Materia`);
  }

  matricularMateria(materiaId: number) {
    return this.http.post<any>(
      `${this.api}/Materia/Inscribir/Usuario`,
      { materiaId }
    );
  }

  cancelarMateria(materiaId: number) {
    return this.http.delete<any>(
      `${this.api}/Materia/${materiaId}`
    );
  }

  obtenerMisMaterias() {
    return this.http.get<any>(`${this.api}/Materia/mis-materias`);
  }

}

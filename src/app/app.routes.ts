import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'matricular',
    loadComponent: () =>
      import('./materias/matricular/matricular')
        .then(m => m.MatricularComponent),
    canActivate: [authGuard]
  },
  {
    path: 'mis-materias',
    loadComponent: () =>
      import('./materias/mis-materias/mis-materias')
        .then(m => m.MisMateriasComponent),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

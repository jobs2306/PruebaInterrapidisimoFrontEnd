import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../toast/toast.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const toast = inject(ToastService);

  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError(err => {

      if (err.status === 401) {
        // Sesión inválida o expirada
        localStorage.clear();

        toast.error('Sesión expirada. Inicia sesión nuevamente');

        router.navigate(['/login']);
      }

      return throwError(() => err);
    })
  );
};

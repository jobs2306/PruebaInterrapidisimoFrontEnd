import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth';
import { ToastService } from '../../core/toast/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  nombre = '';
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {}

  registrar() {
    if (!this.nombre || !this.email || !this.password) {
      this.toast.error('Todos los campos son obligatorios');
      return;
    }

    this.auth.register(this.nombre, this.email, this.password)
      .subscribe({
        next: () => {
          this.toast.success('Registro exitoso. Ahora puedes iniciar sesión');
          this.router.navigate(['/login']);
        },
        error: err => {
          const msg =
            err?.error?.errores?.[0] ??
            'No fue posible registrar el usuario';

          this.toast.error(msg);
        }
      });
  }
}

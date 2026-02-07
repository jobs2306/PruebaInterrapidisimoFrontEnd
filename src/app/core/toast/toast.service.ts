import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ToastService {

  // Signal reactivo
  toasts = signal<Toast[]>([]);

  success(message: string) {
    this.show(message, 'success');
  }

  error(message: string) {
    this.show(message, 'error');
  }

  private show(message: string, type: 'success' | 'error') {
    const toast: Toast = { message, type };

    // actualizar signal (Angular detecta SIEMPRE)
    this.toasts.update(t => [...t, toast]);

    setTimeout(() => {
      this.toasts.update(t => t.filter(x => x !== toast));
    }, 3000);
  }
}

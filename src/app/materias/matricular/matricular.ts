import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { MateriasService } from '../materias';
import { ToastService } from '../../core/toast/toast.service';

@Component({
  selector: 'app-matricular',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './matricular.html',
  styleUrl: './matricular.css'
})
export class MatricularComponent implements OnInit {

  materias: any[] = [];
  cargando = false;
  error = '';

  constructor(
    private materiasService: MateriasService,
    private cdr: ChangeDetectorRef,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.cargarMaterias();
  }

  cargarMaterias() {
    this.cargando = true;

    this.materiasService.obtenerMaterias().subscribe({
      next: res => {
        this.materias = res.datos ?? [];
        this.cargando = false;

        this.cdr.detectChanges(); // 👈 FUERZA render
      },
      error: () => {
        this.error = 'Error al cargar materias';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  matricular(materiaId: number) {
    this.materiasService.matricularMateria(materiaId).subscribe({
      next: () => {
        this.toast.success('Materia matriculada correctamente');
        this.cargarMaterias();
      },
      error: err => {
        const msg =
          err?.error?.errores?.[0] ??
          'No fue posible matricular la materia';

        this.toast.error(msg);
      }
    });
  }

  cancelar(materiaId: number) {
    this.materiasService.cancelarMateria(materiaId).subscribe({
      next: () => {
        this.toast.success('Inscripción cancelada correctamente');
        this.cargarMaterias();
      },
      error: () => {
        this.toast.error('No fue posible cancelar la inscripción');
      }
    });
  }

  confirmarMatricular(materia: any) {
    const ok = confirm(
      `¿Está seguro de matricular la materia "${materia.nombre}"?`
    );

    if (!ok) return;

    this.matricular(materia.materiaId);
  }

  confirmarCancelar(materia: any) {
    const ok = confirm(
      `¿Está seguro de cancelar la inscripción de "${materia.nombre}"?`
    );

    if (!ok) return;

    this.cancelar(materia.materiaId);
  }
}

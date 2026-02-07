import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar';
import { MateriasService } from '../materias';
import { ToastService } from '../../core/toast/toast.service';

@Component({
  selector: 'app-mis-materias',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './mis-materias.html',
  styleUrl: './mis-materias.css'
})
export class MisMateriasComponent implements OnInit {

  materias: any[] = [];
  cargando = false;
  error = '';

  constructor(
    private materiasService: MateriasService,
    private cdr: ChangeDetectorRef,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.cargarMisMaterias();
  }

  cargarMisMaterias() {
    this.cargando = true;

    this.materiasService.obtenerMisMaterias().subscribe({
      next: res => {
        this.materias = res.datos ?? [];
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al cargar mis materias';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  confirmarCancelar(materia: any) {
    const ok = confirm(
      `¿Está seguro de cancelar la inscripción de "${materia.nombre}"?`
    );

    if (!ok) return;

    this.cancelar(materia.materiaId);
  }

  cancelar(materiaId: number) {
    this.materiasService.cancelarMateria(materiaId).subscribe({
      next: () => {
        this.toast.success('Inscripción cancelada correctamente');
        this.cargarMisMaterias();
      },
      error: () => {
        this.toast.error('No fue posible cancelar la inscripción');
      }
    });
  }
}

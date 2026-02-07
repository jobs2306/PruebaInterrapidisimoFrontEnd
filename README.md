# Interrapidísimo – Matrícula de Estudiantes (Frontend)

Este proyecto corresponde al **Frontend de una prueba técnica** desarrollada para la empresa **Interrapidísimo**.

La aplicación permite a estudiantes **autenticarse**, **consultar materias disponibles**, **matricularse**, **cancelar inscripciones** y **visualizar sus materias inscritas**, cumpliendo con reglas de negocio definidas desde el backend.

---

## Descripción General

El sistema simula un módulo académico donde un estudiante autenticado puede:

- Iniciar sesión mediante credenciales
- Visualizar el listado de materias disponibles
- Matricular materias
- Cancelar inscripciones
- Consultar sus materias inscritas
- Ver los compañeros inscritos en cada materia
- Recibir notificaciones visuales (toasts) de éxito o error
- Ser redirigido automáticamente al login cuando la sesión expira

La aplicación está construida como una **Single Page Application (SPA)** usando **Angular moderno (standalone components)**.

---

## Aplicación desplegada

El frontend se encuentra desplegado en una **VPS Linux** y puede ser accedido desde la siguiente URL:

 **https://matriculaestudiantes.joelflow.com/login**

---

## Tecnologías utilizadas

- **Angular 17**
- Standalone Components
- TypeScript
- Angular Router
- HttpClient
- Http Interceptors
- Signals (para estado reactivo)
- CSS puro (sin frameworks externos)
- Nginx (para despliegue en VPS)

---

## Autenticación y Seguridad

- Autenticación basada en **JWT**
- El token se almacena en `localStorage`
- Uso de **HttpInterceptor** para:
  - Adjuntar el token en cada petición
  - Detectar respuestas `401 Unauthorized`
  - Limpiar sesión y redirigir automáticamente al login
- Rutas protegidas mediante **Auth Guard**

---

## Funcionalidades principales

### Login
- Autenticación del estudiante
- Manejo de errores de credenciales
- Redirección automática al módulo principal

### Matricular materias
- Listado de todas las materias
- Identificación visual de materias ya matriculadas
- Confirmación antes de matricular o cancelar
- Validación de reglas de negocio desde el backend
- Notificaciones visuales de éxito o error

### Mis materias
- Listado de materias matriculadas por el estudiante
- Visualización de compañeros inscritos
- Cancelación de inscripción con confirmación
- Actualización automática del estado

### Notificaciones (Toasts)
- Mensajes no intrusivos en la esquina inferior derecha
- Diferenciación visual entre éxito y error
- Desaparición automática
- Implementadas con **Signals** para compatibilidad con Angular zoneless

---

## Decisiones técnicas destacadas

- Uso de **HttpInterceptorFn** en lugar de interceptores basados en clases
- Manejo centralizado de errores `401 Unauthorized`
- Uso de **Signals** para estado reactivo y evitar problemas de change detection
- Arquitectura modular y clara
- Sin dependencias externas para UI (CSS puro)

---

## Ejecución en entorno local

### Requisitos
- Node.js 18+
- Angular CLI

### Ejecución
Aunque el proyecto se encuentre desplegado, se puede ejecutar localmente mediante:
```bash
ng serve

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-revisar-tareas-d',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule],
  templateUrl: './revisar-tareas-d.component.html',
  styleUrl: './revisar-tareas-d.component.css',
  host: { 'ngSkipHydration': '' }

})
export class RevisarTareasDComponent {

  mensajes = [
    { emisor: 'docente', nombre: 'Docente', fecha: '2024-10-16', texto: 'Mensaje del docente.' },
    { emisor: 'alumno', nombre: 'Alumno', fecha: '2024-10-16', texto: 'Mensaje del alumno.' },
  ];

  nuevoMensaje = '';
  calificacion: number | null = null;
  calificacionFueraDeRango: boolean = false;  // Agregar propiedad
  decimalesInvalidos: boolean = false;        // Agregar propiedad

  // Ordena los mensajes de manera que los del docente aparezcan primero
  getMensajesOrdenados() {
    return this.mensajes.sort((a, b) => {
      if (a.emisor === 'docente' && b.emisor === 'alumno') {
        return -1; // El docente va primero
      }
      if (a.emisor === 'alumno' && b.emisor === 'docente') {
        return 1; // El alumno va después
      }
      return 0; // No cambia el orden si ambos son del mismo emisor
    });
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      // Simular que el emisor es el alumno
      const nuevo = {
        emisor: 'docente',
        texto: this.nuevoMensaje,
        nombre: 'Uriel Alejandro', // Cambia esto si es necesario
        fecha: new Date().toLocaleString() // Fecha actual
      };

      this.mensajes.push(nuevo); // Agregar el nuevo mensaje
      this.nuevoMensaje = ''; // Limpiar el campo
    }
  }

  guardarCalificacion() {
    if (this.calificacion !== null) {
      // Guardar la calificación (lógica adicional)
      console.log(`Calificación guardada: ${this.calificacion}`);
    } else {
      console.log('No se ha ingresado una calificación');
    }
  }

  validarDecimales(): void {
    if (this.calificacion !== null) {
      // Validar rango
      this.calificacionFueraDeRango = this.calificacion < 0 || this.calificacion > 10;

      // Validar decimales (máximo 2 decimales)
      const partes = this.calificacion.toString().split('.');
      this.decimalesInvalidos = partes[1] ? partes[1].length > 2 : false;

      // Corregir si la calificación está fuera de rango
      if (this.calificacionFueraDeRango) {
        setTimeout(() => {
          // Ajustar la calificación al límite más cercano (0 o 10), usando coalescencia nula
          this.calificacion = (this.calificacion ?? 0) < 0 ? 0 : 10;

          // Una vez corregido, quitar el mensaje de error
          this.calificacionFueraDeRango = false;
        }, 1000); // Retraso para que se muestre el mensaje antes de corregir
      }

      // Corregir si los decimales son inválidos
      if (this.decimalesInvalidos) {
        setTimeout(() => {
          const valorSinDecimales = partes[0] + (partes[1] ? '.' + partes[1].substring(0, 2) : '');
          this.calificacion = parseFloat(valorSinDecimales ?? '0');

          // Quitar el mensaje de decimales inválidos
          this.decimalesInvalidos = false;
        }, 1000); // Retraso para que se muestre el mensaje antes de corregir
      }
    }
  }


}

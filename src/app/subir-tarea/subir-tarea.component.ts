import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SubirArchivosComponent } from '../subir-archivos/subir-archivos.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subir-tarea',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule],
  templateUrl: './subir-tarea.component.html',
  styleUrl: './subir-tarea.component.css',
  host: { 'ngSkipHydration': '' }

})
export class SubirTareaComponent {

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(SubirArchivosComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  mensajes = [
    { emisor: 'alumno', texto: 'Este es un mensaje del alumno.', nombre: 'Alan Ricardo', fecha: new Date().toLocaleString() },
    { emisor: 'docente', texto: 'Este es un mensaje del docente.', nombre: 'Uriel Alejandro', fecha: new Date().toLocaleString() }
  ];

  nuevoMensaje = '';

  enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      // Simular que el emisor es el alumno
      const nuevo = {
        emisor: 'alumno',
        texto: this.nuevoMensaje,
        nombre: 'Alan Ricardo', // Cambia esto si es necesario
        fecha: new Date().toLocaleString() // Fecha actual
      };

      this.mensajes.push(nuevo); // Agregar el nuevo mensaje
      this.nuevoMensaje = ''; // Limpiar el campo
    }
  }

}

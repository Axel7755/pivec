import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule

@Component({
  selector: 'app-listado-entregas-tareas',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './listado-entregas-tareas.component.html',
  styleUrl: './listado-entregas-tareas.component.css',
  host: { 'ngSkipHydration': '' }
})
export class ListadoEntregasTareasComponent {

  showCheckboxes = false;
  tareas = [
    {
      nombre: 'Alan Ricardo',
      descripcion: 'El desarrollo del liderazgo personal es crucial para el crecimiento individual y profesional ambiciosas, superando obstáculos con mayor claridad y dirección...',
      fecha: '12/08/2024', hora: '14:30', seleccionada: false
    },

    {
      nombre: 'Luis Francisco',
      descripcion: 'El desarrollo del liderazgo personal es crucial para el crecimiento individual y profesional ambiciosas, superando obstáculos con mayor claridad y dirección...',
      fecha: '22/11/2024', hora: '15:45', seleccionada: false
    },
  ];

  toggleCheckboxes() {
    this.showCheckboxes = !this.showCheckboxes;
  }

  hayTareasSeleccionadas(): boolean {
    return this.tareas.some(tarea => tarea.seleccionada);
  }

  eliminarEntregas() {
    this.tareas = this.tareas.filter(tarea => !tarea.seleccionada);
  }

}

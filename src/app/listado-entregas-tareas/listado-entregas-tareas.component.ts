import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-entregas-tareas',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './listado-entregas-tareas.component.html',
  styleUrl: './listado-entregas-tareas.component.css',
  host: { 'ngSkipHydration': '' }
})
export class ListadoEntregasTareasComponent {

  constructor(private router: Router) {}

  irACalificarTarea() {
    // Navegas a la página de calificar tarea, pasando el id de la tarea
    //this.router.navigate(['/menu-materia/crear-tareas-d', tareaId]);
    this.router.navigate(['/menu-materia/revisar-tareas-d']);

  }

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

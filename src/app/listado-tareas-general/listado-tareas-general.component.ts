import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-listado-tareas-general',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatButtonModule, MatMenuModule],
  templateUrl: './listado-tareas-general.component.html',
  styleUrl: './listado-tareas-general.component.css',
  host: { 'ngSkipHydration': '' }
})
export class ListadoTareasGeneralComponent {

  constructor(private router: Router) { }

  navigateToCrearTareas() {
    this.router.navigate(['/menu-materia/crear-tareas-d']);
  }

  editarTarea() {
    console.log('Editar tarea seleccionada');
    // Lógica para editar la tarea
  }

  eliminarTarea() {
    console.log('Eliminar tarea seleccionada');
    // Lógica para eliminar la tarea
  }


}

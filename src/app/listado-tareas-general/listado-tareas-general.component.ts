import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  idgrupos: string | null = null;
  g_idmaterias: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Usa `parent` para acceder a los parámetros de `menu-materia`
    this.route.parent?.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];
      //console.log('ID de grupo:', this.idgrupos);
      //console.log('ID de materia:', this.g_idmaterias);
    });
  }

  navigateToCrearTareas() {
    this.router.navigate(['/menu-materia',this.idgrupos,this.g_idmaterias,'crear-tareas-d']);
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

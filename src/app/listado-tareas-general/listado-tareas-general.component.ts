import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TareasService } from '../servicios/tareas.service';
import { of, catchError } from 'rxjs';

@Component({
  selector: 'app-listado-tareas-general',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatMenuModule,
    CommonModule, MatIconModule],
  templateUrl: './listado-tareas-general.component.html',
  styleUrl: './listado-tareas-general.component.css',
  host: { 'ngSkipHydration': '' }
})
export class ListadoTareasGeneralComponent {
  idgrupos: string | null = null;
  g_idmaterias: string | null = null;
  //grupos: any[] = [];
  tareas: any[] = [];


  constructor(private route: ActivatedRoute, private router: Router,
    private tareasService: TareasService
  ) { }

  ngOnInit(): void {
    // Usa `parent` para acceder a los parámetros de `menu-materia`
    this.route.parent?.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];
      //console.log('ID de grupo:', this.idgrupos);
      //console.log('ID de materia:', this.g_idmaterias);

      this.tareasService.findTareaByGrupo(this.g_idmaterias!, this.idgrupos!).pipe(
        catchError(error => {
          console.error('Error al recuperar tareas', error);
          alert('Error al recuperar tareas');
          return of(null);
        })
      ).subscribe(tareasData => {
        if (tareasData) {
          this.tareas = tareasData.filter((tarea: any) => tarea !== null);
        }
      }
      )
    });
  }

  navigateToCrearTareas() {
    this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias, 'crear-tareas-d']);
  }

  editarTarea(tarea: any) {
    console.log('Editar tarea seleccionada');
    this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias, 'editar-tareas-d', tarea.idtareas]);
  }

  eliminarTarea(tarea: any) {
    this.tareasService.deleteTarea(tarea.idtareas, this.g_idmaterias!, this.idgrupos!).pipe(
       catchError(error => { console.error('Error al eliminar la tarea', error);
         alert('Error al eliminar la tarea'); return of(null); }) 
        ).subscribe(response => {
           if (response) {
             console.log('Tarea eliminada exitosamente');
              this.tareas = this.tareas.filter(t => t.idtareas !== tarea.idtareas); 
            } 
          }
        );
    //console.log('Eliminar tarea seleccionada');
    // Lógica para eliminar la tarea
  }
  irListadoEntregas(tarea: any) {
    //this.router.navigate([`/menu-materia`, grupo.idgrupos, grupo.g_idmaterias]);
  }

}

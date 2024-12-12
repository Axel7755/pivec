import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; 
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EntregasService } from '../servicios/entregas.service';
import { of, catchError, forkJoin, map, Observable  } from 'rxjs';
import { TareasService } from '../servicios/tareas.service';
import { AlumnosService } from '../servicios/alumnos.service';

interface EntregaAlumno {
  entrega: any;
  alumno: any;
}

@Component({
  selector: 'app-listado-entregas-tareas',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatButtonModule, CommonModule, FormsModule],
  templateUrl: './listado-entregas-tareas.component.html',
  styleUrl: './listado-entregas-tareas.component.css',
  host: { 'ngSkipHydration': '' }
})
export class ListadoEntregasTareasComponent {
  idgrupos: string | null = null;
  //userId: string | null = null;
  //alumno: string | null = "Uriel Alejandro";
  g_idmaterias: string | null = null;
  titulo: string = "";
  descrip: string = "";
  idtarea: string | null = null;
  entregas: any[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private entregasService: EntregasService,
    private alumnosService: AlumnosService,
    private tareasService: TareasService
  ) {}

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];
    });
  
    this.route.params.subscribe(paramsh => {
      this.idtarea = paramsh['idtarea'];
      console.log("tarea:", this.idtarea);
      console.log("g_idmaterias:", this.g_idmaterias);
      console.log("idgrupos:", this.idgrupos);
  
      if (this.idtarea && this.g_idmaterias && this.idgrupos) {
        this.tareasService.findTareaById(this.g_idmaterias, this.idgrupos, this.idtarea).pipe(
          catchError(error => {
            console.error('Error al recuperar tarea', error);
            alert('Error al recuperar tarea');
            return of(null);
          })
        ).subscribe(tareaData => {
          if (tareaData) {
            this.titulo = tareaData.titulo_T;
            this.descrip = tareaData.descripción_T;
          } else {
            console.error('tarea no existe');
          }
        });
      } else {
        console.error('Algunos parámetros son null:', { idtarea: this.idtarea, g_idmaterias: this.g_idmaterias, idgrupos: this.idgrupos });
      }
    });
  
    this.entregasService.obtenerEntregasByTarea(this.idtarea!).pipe(
      catchError(error => {
        console.error('Error al recuperar entregas', error);
        return of(null);
      })
    ).subscribe(entregasData => {
      if (entregasData) {
        const entregasSimples = entregasData.filter((entrega: any) => entrega !== null);
        const EntregaAlumno$: Observable<EntregaAlumno>[] = entregasSimples.map((entrega: any) =>
          this.alumnosService.obtenerAlumno(entrega.e_boleta).pipe(
            catchError(this.handleError),
            map(alumno => ({ entrega, alumno }))
          )
        );
        forkJoin(EntregaAlumno$).subscribe((results: EntregaAlumno[]) => {
          results.forEach(({ entrega, alumno }) => {
            const entregaAlumnoConSeleccionada = { ...entrega, alnombre: `${alumno.apellidoP_Al} ${alumno.apellidoM_Al} ${alumno.nombres_Al}`, boleta: alumno.boleta , seleccionada: false };
            this.entregas.push(entregaAlumnoConSeleccionada);
            console.log(this.entregas);
          });
        });
      }
    });
  }
  

  irACalificarTarea(entrega: any) {
    // Navegas a la página de calificar tarea, pasando el id de la tarea
    //this.router.navigate(['/menu-materia/crear-tareas-d', tareaId]);
    this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias,'revisar-tareas-d', this.idtarea, entrega.boleta, ]);

  }

  showCheckboxes = false;

  toggleCheckboxes() {
    this.showCheckboxes = !this.showCheckboxes;
  }

  hayTareasSeleccionadas(): boolean {
    return this.entregas.some(entrega => entrega.seleccionada);
  }

  eliminarEntregas() {
    this.entregas = this.entregas.filter(entregas => !entregas.seleccionada);
  }

  private handleError(error: any) {
    console.error('Error:', error);
    //alert('Ocurrió un error. Por favor, inténtelo de nuevo.');
    return of(null);
  }

}

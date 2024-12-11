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
  entregas = [
    {
      nombre: 'Alan Ricardo',
      descripcion: 'El desarrollo del liderazgo personal es crucial para el crecimiento individual y profesional ambiciosas, superando obstáculos con mayor claridad y dirección...',
      fecha: '12/08/2024', hora: '14:30', 
      seleccionada: false
    },

    {
      nombre: 'Luis Francisco',
      descripcion: 'El desarrollo del liderazgo personal es crucial para el crecimiento individual y profesional ambiciosas, superando obstáculos con mayor claridad y dirección...',
      fecha: '22/11/2024', hora: '15:45', 
      seleccionada: false
    },
  ];

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

      //
      
    })
    this.route.params.subscribe(paramsh => {
      this.idtarea = paramsh['idtarea'];
      //
      this.tareasService.findTareaById(this.idtarea!,this.descrip!,this.idtarea!).pipe(
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
      //
      this.entregasService.obtenerEntregasByTarea(this.idtarea!).pipe(
        catchError(error => {
          console.error('Error al recuperar entregas', error);
          //alert('Error al recuperar entregas');
          //this.entregas=[]
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
             
            });
            //this.visualizar = this.vencidas;
          });
        }
      }
      )
    })
    
  }

  irACalificarTarea(entrega: any) {
    // Navegas a la página de calificar tarea, pasando el id de la tarea
    //this.router.navigate(['/menu-materia/crear-tareas-d', tareaId]);
    this.router.navigate(['/menu-materia/revisar-tareas-d']);

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

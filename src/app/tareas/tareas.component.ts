import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, catchError, forkJoin, map, Observable } from 'rxjs';
import { TareasService } from '../servicios/tareas.service';
import { DocentesService } from '../servicios/docentes.service';
import { GruposService } from '../servicios/grupos.service';
import { CommonModule } from '@angular/common';
import { EntregasService } from '../servicios/entregas.service';
import { AuthService } from '../servicios/auth.service';
import { GruposAlumnosService } from '../servicios/grupos-alumnos.service';

interface TareaConEntrega {
  tarea: any;
  entrega: any;
}

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  idgrupos: string | null = null;
  g_idmaterias: string | null = null;
  grupo: any;
  userId: string | null = null;
  materia: any;
  estado: number = 0;
  visualizar: any[] = [];
  tareasp: any[] = [];
  entregadas: any[] = [];
  vencidas: any[] = [];
  entregas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tareasService: TareasService,
    private docentesService: DocentesService,
    private entregasService: EntregasService,
    private authService: AuthService,
    private gruposService: GruposService,
    private gruposAlumnosService: GruposAlumnosService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log('User ID obtenido:', this.userId);

    if (this.userId) {
      this.loadGrupos();
    } else {
      console.error('User ID no disponible');
    }
  }

  loadGrupos(): void {
    this.gruposAlumnosService.findGruposAlumno(this.userId!).subscribe(
      (grupos: any[]) => {
        if (grupos && grupos.length > 0) {
          console.log('Grupos del alumno:', grupos);
          // Buscar tareas para cada grupo
          grupos.forEach(grupo => {
            this.findTareasPorGrupo(grupo.ga_idgrupos, grupo.ga_idmaterias);
            this.findTareasVencidasPorGrupo(grupo.ga_idgrupos, grupo.ga_idmaterias);
          });
        } else {
          console.log('No existen grupos');
        }
      },
      (error) => {
        console.error('Error al obtener los grupos:', error);
      }
    );
  }

  // TAREAS PENDIENTES
  findTareasPorGrupo(grupoId: string, materiaId: string): void {
    this.tareasService.findTareaByGrupoP(materiaId, grupoId).pipe(
      // Manejo de errores para capturar cualquier problema durante la llamada
      catchError((error) => {
        console.error(`Error al buscar tareas para el grupo ${grupoId}:`, error);
        // Retornar un array vacío para continuar el flujo sin interrumpir
        return of([]);
      })
    ).subscribe((tareas: any[]) => {
      // Verificar si el resultado contiene tareas
      if (tareas && tareas.length > 0) {
        console.log(`Tareas PENDIENTES encontradas para el grupo ${grupoId}:`, tareas);
        // Combinar las nuevas tareas con las existentes en el arreglo tareasp
          // >>ENTREGADAS
          
            const tareasG = tareas.filter((tarea: any) => tarea !== null);
            const tareasConEntregas$: Observable<TareaConEntrega>[] = tareasG.map((tarea: any) =>
              this.entregasService.obtenerEntregasByTareaAlumno(tarea.idtareas, this.userId!).pipe(
                catchError(this.handleError),
                map(entrega => ({ tarea, entrega }))
              )
            );

            forkJoin(tareasConEntregas$).subscribe((results: TareaConEntrega[]) => {
              results.forEach(({ tarea, entrega }) => {
                if (entrega) {
                  this.entregas.push(tarea);
                } else {
                  this.tareasp.push(tarea);
                }
              });
              this.visualizar = this.tareasp;
            });

        this.visualizar = this.tareasp;
        console.log('tareaaaa:', this.tareasp);
      } else {
        console.log(`No se encontraron tareas para el grupo ${grupoId}.`);
      }
    });
  }

  // TAREAS VENCIDAS
  findTareasVencidasPorGrupo(grupoId: string, materiaId: string): void {
    this.tareasService.findTareaByGrupoV(materiaId, grupoId).pipe(
      // Manejo de errores para capturar cualquier problema durante la llamada
      catchError((error) => {
        console.error(`Error al buscar tareas para el grupo ${grupoId}:`, error);
        // Retornar un array vacío para continuar el flujo sin interrumpir
        return of([]);
      })
    ).subscribe((tareas: any[]) => {
      // Verificar si el resultado contiene tareas
      if (tareas && tareas.length > 0) {
        console.log(`Tareas Vencidas encontradas para el grupo ${grupoId}:`, tareas);
        // Combinar las nuevas tareas con las existentes en el arreglo tareasp
        
          // >>Vencidas 
          
            const tareasG = tareas.filter((tarea: any) => tarea !== null);
            const tareasConEntregas$: Observable<TareaConEntrega>[] = tareasG.map((tarea: any) =>
              this.entregasService.obtenerEntregasByTareaAlumno(tarea.idtareas, this.userId!).pipe(
                catchError(this.handleError),
                map(entrega => ({ tarea, entrega }))
              )
            );

            forkJoin(tareasConEntregas$).subscribe((results: TareaConEntrega[]) => {
              results.forEach(({ tarea, entrega }) => {
                if (entrega) {
                  this.entregas.push(tarea);
                } else {
                  this.vencidas.push(tarea);
                }
              });
              //this.visualizar = this.tareasp;
            });
          
        

        //this.visualizar = this.vencidas;
      } else {
        console.log(`No se encontraron tareas para el grupo ${grupoId}.`);
      }
    });

  }


  Entregar(tarea: any): void {
    if (tarea && tarea.idtareas) {
      console.log("Navegando a subir tarea con tarea:", tarea);

      //console.log("Navegando a subir tarea con tarea:", tarea);
    switch (this.estado){
      
      case 1:
        this.router.navigate(['/menu-materia', tarea.ta_idgrupos, tarea.ta_idmaterias, 'editar-entrega-a', tarea.idtareas]);
        break;
      case 0:
      case 2:
        this.router.navigate(['/menu-materia', tarea.ta_idgrupos, tarea.ta_idmaterias, 'subir-tarea', tarea.idtareas]);
        break; 
    }
    } else {
      console.error("Error: Tarea no válida");
    }
  }

  verPendientes(): void {
    this.estado = 0;
    this.visualizar = this.tareasp;
    console.log('Tareas pendientes:', this.visualizar);
  }

  verEntregadas(): void {
    this.estado = 1;
    this.visualizar = this.entregas;
    console.log('Tareas entregadas:', this.visualizar);
  }

  verVencidas(): void {
    this.estado = 2;
    this.visualizar = this.vencidas;
    console.log('Tareas vencidas:', this.visualizar);
  }

  private handleError(error: any): Observable<null> {
    console.error('Ocurrió un error:', error);
    return of(null);  // Retorna un observable con null en caso de error
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, catchError, forkJoin, map, Observable } from 'rxjs';
import { TareasService } from '../servicios/tareas.service';
import { DocentesService } from '../servicios/docentes.service';
import { GruposService } from '../servicios/grupos.service';
import { CommonModule } from '@angular/common';
import { EntregasService } from '../servicios/entregas.service';
import { AuthService } from '../servicios/auth.service';

interface TareaConEntrega {
  tarea: any;
  entrega: any;
}

@Component({
  selector: 'app-tareas-a',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareas-a.component.html',
  styleUrls: ['./tareas-a.component.css']
})
export class TareasAComponent implements OnInit {
  idgrupos: string | null = null;
  g_idmaterias: string | null = null;
  grupo: any;
  userId: string | null = null;
  docente: any;
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
    private gruposService: GruposService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.route.parent?.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];

      forkJoin({
        tareas: this.tareasService.findTareaByGrupoP(this.g_idmaterias!, this.idgrupos!).pipe(catchError(this.handleError)),
        grupo: this.gruposService.getGruposByID(this.g_idmaterias!, this.idgrupos!).pipe(catchError(this.handleError))
      }).subscribe(({ tareas, grupo }) => {
        this.grupo = grupo;

        if (tareas) {
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
        }

        this.docentesService.obtenerDocente(this.grupo.g_doc_noTrabajador).pipe(
          catchError(this.handleError)
        ).subscribe(docenteData => {
          if (docenteData) {
            this.docente = `${docenteData.apellidoP_Do} ${docenteData.apellidoM_Do} ${docenteData.nombres_Do} `;
          }
        });
      });



      this.tareasService.findTareaByGrupoV(this.g_idmaterias!, this.idgrupos!).pipe(
        catchError(this.handleError)
      ).subscribe(vencidas => {
        if(vencidas){
          const vencidasG = vencidas.filter((tarea: any) => tarea !== null);
          const tareasConEntregas$: Observable<TareaConEntrega>[] = vencidasG.map((tarea: any) =>
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
            //this.visualizar = this.vencidas;
          });
        }
      })
    });
  }

  Entregar(tarea: any) {
    //console.log("Navegando a subir tarea con tarea:", tarea);
    switch (this.estado){
      
      case 1:
        this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias, 'editar-entrega-a', tarea.idtareas]);
        break;
      case 0:
      case 2:
        this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias, 'subir-tarea', tarea.idtareas]);
        break; 
    }
    
  }

  verPendientes() {
    this.estado = 0;
    this.visualizar = this.tareasp;
  }

  verEntregadas() {
    this.estado = 1;
    this.visualizar = this.entregas;
  }

  verVencidas() {
    this.estado = 2;
    this.visualizar = this.vencidas;

  }

  private handleError(error: any) {
    console.error('Error:', error);
    //alert('Ocurrió un error. Por favor, inténtelo de nuevo.');
    return of(null);
  }
}

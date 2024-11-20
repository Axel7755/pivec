import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, catchError } from 'rxjs';
import { TareasService } from '../servicios/tareas.service';
import { DocentesService } from '../servicios/docentes.service';
import { GruposService } from '../servicios/grupos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tareas-a',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareas-a.component.html',
  styleUrl: './tareas-a.component.css'
})
export class TareasAComponent implements OnInit {
  idgrupos: string | null = null;
  g_idmaterias: string | null = null;
  grupo: any;
  docente: any;
  tareasp: any[] = [];
  entregas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tareasService: TareasService,
    private docentesService: DocentesService,
    private gruposService: GruposService
  ) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];

      this.tareasService.findTareaByGrupoP(this.g_idmaterias!, this.idgrupos!).pipe(
        catchError(error => {
          console.error('Error al recuperar tareas', error);
          alert('Error al recuperar tareas');
          return of(null);
        })
      ).subscribe(tareasData => {
        if (tareasData) {
          this.tareasp = tareasData.filter((tarea: any) => tarea !== null);
        }
      });

      this.gruposService.getGruposByID(this.g_idmaterias!, this.idgrupos!).pipe(
        catchError(error => {
          console.error('Error al recuperar grupo', error);
          alert('Error al recuperar grupo');
          return of(null);
        })
      ).subscribe(grupoDaTA => {
        if (grupoDaTA) {
          this.grupo = grupoDaTA;

          this.docentesService.obtenerDocente(this.grupo.g_doc_noTrabajador).pipe(
            catchError(error => {
              console.error('Error al recuperar docente', error);
              alert('Error al recuperar docente');
              return of(null);
            })
          ).subscribe(docenteData => {
            if (docenteData) {
              this.docente = `${docenteData.apellidoP_Do} ${docenteData.nombres_Do} ${docenteData.apellidoM_Do}`;
            }
          });
        }
      });
    });
  }

  Entregar(tarea: any) {
    console.log("Navegando a subir tarea con tarea:", tarea);
    this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias, 'subir-tarea', tarea.idtareas]);
  }
}

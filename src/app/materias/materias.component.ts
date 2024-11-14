import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../servicios/auth.service';
import { GruposService } from '../servicios/grupos.service';
import { MateriasService } from '../servicios/materias.service';
import { forkJoin, of, mergeMap, catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GruposAlumnosService } from '../servicios/grupos-alumnos.service';
import { DocentesService } from '../servicios/docentes.service';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css'],
})
export class MateriasComponent implements OnInit {
  isDocente: boolean = false;
  userId: string | null = null;
  grupos: any[] = [];
  docentes: any[] = [];
  materias: any[] = [];
  combinados: any[] = [];

  constructor(
    private authService: AuthService,
    private gruposService: GruposService,
    private grupoAlumnosService: GruposAlumnosService,
    private materiasService: MateriasService,
    private docentesService: DocentesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isDocente = this.authService.getUserRole() === 'docente';
    this.userId = this.authService.getUserId();
    if (this.isDocente) {
      console.log("docente")
      this.gruposService.getGruposByDocente(this.userId!).pipe(
        catchError(error => {
          console.error('Error al recuperar grupos', error);
          alert('Error al recuperar grupos');
          return of([]);
        })
      )
        .subscribe(gruposData => {
          this.grupos = gruposData;
          const materiasObservables = this.grupos.map(grupob =>
            this.materiasService
              .findMateriaById(grupob.g_idmaterias)
              .pipe(
                catchError(error => {
                  console.error('Error al recuperar materias', error);
                  alert('Error al recuperar materias');
                  return of(null);
                })
              )
          );
          forkJoin(materiasObservables).subscribe(materiasData => {
            this.materias = materiasData.filter(materia => materia !== null);
            if (this.materias.length > 0) {
              this.combinados = this.grupos.map(obj1 => {
                const matchingObj2 = this.materias.find(
                  obj2 => obj2.idmaterias === obj1.g_idmaterias
                );
                return matchingObj2
                  ? { ...obj1, material: matchingObj2.material }
                  : obj1;
              });
              //console.log(this.combinados);
            }
          });
        });
    } else {
      this.grupoAlumnosService.findGruposAlumno(this.userId!).pipe(
        catchError(error => {
          console.error('Error al recuperar grupos', error);
          alert('Error al recuperar grupos');
          return of([]);
        }),
        mergeMap(gruposAlumnData => {
          if (gruposAlumnData.length === 0) {
            return of([]); // No hay grupos, devolver un array vacío
          }
      
          // Obtener los detalles de cada grupo
          return forkJoin(gruposAlumnData.map((grupoAl: any) => {
            return this.gruposService.getGruposByID(grupoAl.ga_idmaterias, grupoAl.ga_idgrupos).pipe(
              catchError(error => {
                console.error('Error al recuperar grupos', error);
                alert('Error al recuperar grupos');
                return of(null); // Devolver null en caso de error
              })
            );
          })) as Observable<any[]>; // Tipar correctamente el retorno de forkJoin
        }),
        mergeMap((gruposDataArray: any[]) => {
          const gruposFiltrados = gruposDataArray.filter(grupoData => grupoData !== null);
          this.grupos.push(...gruposFiltrados);
          console.log(this.grupos);
      
          if (this.grupos.length === 0) {
            return of([]); // No hay grupos, devolver un array vacío
          }
      
          // Obtener los detalles de cada docente
          return forkJoin(this.grupos.map(grupo => {
            return this.docentesService.obtenerDocente(grupo.g_doc_noTrabajador).pipe(
              catchError(error => {
                console.error('Error al recuperar docente', error);
                alert('Error al recuperar docente');
                return of(null); // Devolver null en caso de error
              })
            );
          })) as Observable<any[]>; // Tipar correctamente el retorno de forkJoin
        })
      ).subscribe((docenteDataArray: any[]) => {
        const docentesFiltrados = docenteDataArray.filter(docenteData => docenteData !== null);
        this.docentes.push(...docentesFiltrados);
        console.log(this.docentes);
      
        const materiasObservables = this.grupos.map(grupo =>
          this.materiasService.findMateriaById(grupo.g_idmaterias).pipe(
            catchError(error => {
              console.error('Error al recuperar materias', error);
              alert('Error al recuperar materias');
              return of(null);
            })
          )
        );
      
        forkJoin(materiasObservables).subscribe(materiasData => {
          this.materias = materiasData.filter(materia => materia !== null);
      
          if (this.materias.length > 0) {
            // Combinación final de grupos, materias y docentes
            this.combinados = this.grupos.map(grupo => {
              const matchingMateria = this.materias.find(materia => materia.idmaterias === grupo.g_idmaterias);
              const matchingDocente = this.docentes.find(docente => docente.noTrabajador === grupo.g_doc_noTrabajador);
      
              return {
                ...grupo,
                material: matchingMateria ? matchingMateria.material : null,
                docente: matchingDocente 
                  ? `${matchingDocente.apellidoP_Do} ${matchingDocente.apellidoM_Do} ${matchingDocente.nombres_Do}`.trim()
                  : null // Asegúrate de ajustar las propiedades según los datos de tu docente
              };
            });
      
            console.log(this.combinados);
          }
        });
      });            

    }
  }
  irGeneralMaterias(grupo: any) {
    this.router.navigate([`/menu-materia`, grupo.idgrupos, grupo.g_idmaterias]);

  }
}

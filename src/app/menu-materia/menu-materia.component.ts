import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { ChatBotDComponent } from "../chat-bot-d/chat-bot-d.component";
import { forkJoin, of, mergeMap, catchError, Observable } from 'rxjs';
import { ClockService } from '../servicios/clock.service';
import { GruposService } from '../servicios/grupos.service';
import { GruposAlumnosService } from '../servicios/grupos-alumnos.service';
import { MateriasService } from '../servicios/materias.service';
import { HorariosService } from '../servicios/horarios.service';
import { AlumnosService } from '../servicios/alumnos.service';
import { DocentesService } from '../servicios/docentes.service';
import { InReuComponent } from "../video-call/in-reu/in-reu.component";


export interface Section {
  icon: string;
  name: string;
  route: string;
}

@Component({
  selector: 'app-menu-materia',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, CommonModule,
    RouterOutlet, MatListModule, RouterLink, RouterLinkActive, ChatBotDComponent, InReuComponent],
  templateUrl: './menu-materia.component.html',
  styleUrl: './menu-materia.component.css'
})
export class MenuMateriaComponent implements OnInit {
  idgrupos: string | null = null;
  g_idmaterias: string | null = null;
  secciones: Section[] = []
  collapsed = false;
  isDocente: boolean = false;
  userId: string | null = null;

  grupos: any[] = [];
  docentes: any[] = [];
  materias: any[] = [];
  combinados: any[] = [];
  horarios: any;



  constructor(private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private authService: AuthService,
    private router: Router,
    private clockService: ClockService,
    private gruposService: GruposService,
    private grupoAlumnosService: GruposAlumnosService,
    private materiasService: MateriasService,
    private horariosService: HorariosService,
    private AlumnoService: AlumnosService,
    private docentesService: DocentesService,
  ) { }

  ngOnInit(): void {
    // Usa `parent` para acceder a los parámetros de `menu-materia`
    this.route.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];
      //console.log('ID de grupo:', this.idgrupos);
      //console.log('ID de materia:', this.g_idmaterias);      
    });

    this.isDocente = this.authService.getUserRole() === 'docente';
    this.userId = this.authService.getUserId();
    if (this.userId && this.isDocente) {
      this.secciones = [
        {
          icon: 'interests',
          name: 'General',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/general-a`
        },
        {
          icon: 'assignment',
          name: 'Tareas',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/listado-tareas-g`
        },
        {
          icon: 'theaters',
          name: 'Clases Grabadas',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/clases-grabadas`
        },
      ];
      console.log("docente")

      this.gruposService.getGruposByDocente(this.userId).pipe(
        catchError(error => {
          console.error('Error al recuperar grupos', error);
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
              const horariosObservables = this.combinados.map(grupoCombinado =>
                this.horariosService.getHorario(grupoCombinado.g_idmaterias, grupoCombinado.idgrupos)
              );

              forkJoin(horariosObservables).subscribe(allHorarios => {
                this.horarios = allHorarios;
              });
            }
          });
        });
    } else {

      this.secciones = [
        {
          icon: 'interests',
          name: 'General',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/general-a`
        },
        {
          icon: 'assignment',
          name: 'Tareas',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/tareas-a`
        },
        {
          icon: 'theaters',
          name: 'Clases Grabadas',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/clases-grabadas`
        },
      ];
    }
    this.grupoAlumnosService.findGruposAlumno(this.userId!).pipe(
      catchError(error => {
        console.error('Error al recuperar grupos', error);
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

            const horariosObservables = this.combinados.map(grupoCombinado =>
              this.horariosService.getHorario(grupoCombinado.g_idmaterias, grupoCombinado.idgrupos)
            );

            forkJoin(horariosObservables).subscribe(allHorarios => {
              this.horarios = allHorarios;
              //console.log("hoarios a evaluar",this.horaios);
            });
        }
      });
    });
    this.clockService.getClock().subscribe(time => {
      //this.time = time;
      //this.checkCondition();
      if(this.getHorariosActuales().length > 0){
       this.clockService.addId(this.getHorariosActuales()[0].ho_idmaterias, this.getHorariosActuales()[0].ho_idgrupos);
      }
      
   });
  }
  getHorariosActuales(): any[] {
    const diasSemana: { [key: string]: string } = {
      0: 'DOMINGO',
      1: 'LUNES',
      2: 'MARTES',
      3: 'MIERCOLES',
      4: 'JUEVES',
      5: 'VIERNES',
      6: 'SABADO',
    };

    const ahora = new Date();
    const diaActual = diasSemana[ahora.getDay()];
    const horaActual = ahora.toTimeString().split(' ')[0]; // Hora actual en formato HH:mm:ss

    // Filtrar horarios para el día actual y verificar intervalos
    return this.horarios.flatMap((grupo: any) =>
      grupo.filter((horario: any) => {
        if (horario.dia !== diaActual) return false;
        if (!horario.entrada || !horario.salida) return false;
        return (
          horaActual >= horario.entrada && horaActual <= horario.salida
        );
      })
    );
  }
  collapse(): void {
    this.collapsed = !this.collapsed;

    // Forzar detección de cambios para actualizar el diseño de forma inmediata
    this.ngZone.run(() => {
      Promise.resolve().then(() => this.cdRef.detectChanges());
    });
  }

  irPaginaInicial() {
    this.router.navigate([`/menu-principal/materias`]);
  }

  exit() {
    this.authService.logout();
    this.router.navigate([`/`]);
  }

}

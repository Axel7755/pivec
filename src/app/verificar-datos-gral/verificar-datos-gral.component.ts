import { Component, OnInit, Inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { forkJoin, of, mergeMap, catchError, Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../servicios/auth.service';
import { GruposService } from '../servicios/grupos.service';
import { GruposAlumnosService } from '../servicios/grupos-alumnos.service';
import { MateriasService } from '../servicios/materias.service';
import { DocentesService } from '../servicios/docentes.service';
import { AlumnosService } from '../servicios/alumnos.service';
import { HorariosService } from '../servicios/horarios.service';
import { error } from 'console';

export interface Horario {
  materia: string;
  grupo: string;
  docente: string;
  lunesEntrada: string;
  lunesSalida: string;
  martesEntrada: string;
  martesSalida: string;
  miercolesEntrada: string;
  miercolesSalida: string;
  juevesEntrada: string;
  juevesSalida: string;
  viernesEntrada: string;
  viernesSalida: string;
}


@Component({
  selector: 'app-verificar-datos-gral',
  standalone: true,
  imports: [MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIcon,
    CommonModule],
  templateUrl: './verificar-datos-gral.component.html',
  styleUrl: './verificar-datos-gral.component.css',
  host: { 'ngSkipHydration': '' }
})

export class VerificarDatosGralComponent implements OnInit {
  isDocente: boolean = false;
  userId: string | null = null;
  grupos: any[] = [];
  docentes: any[] = [];
  materias: any[] = [];
  combinados: any[] = [];


  boleta: string = '2021670048';
  nombre: string = 'Luis Francisco Lopez Lopez';

  displayedColumns: string[] = ['materia', 'docente', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'acciones'];
  dataSource: Horario[] = [];

  constructor(
    private authService: AuthService,
    private gruposService: GruposService,
    private grupoAlumnosService: GruposAlumnosService,
    private materiasService: MateriasService,
    private horariosService: HorariosService,
    private alumnoService: AlumnosService,
    private docentesService: DocentesService,
  ) { }

  eliminarFila(index: number) {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar esta fila?');
    if (confirmation) {
      const updatedData = this.dataSource.filter((_, i) => i !== index);
      this.dataSource = updatedData; // Reasigna con el nuevo array filtrado
    }
  }


  ngOnInit() {
    this.isDocente = this.authService.getUserRole() === 'docente';
    this.userId = this.authService.getUserId();

    if (this.isDocente) {
      console.log("docente")

      this.docentesService.obtenerDocente(this.userId!).pipe(
        catchError(this.handleError)
      ).subscribe(docenteData => {
        if (docenteData) {
          this.nombre = `${docenteData.apellidoP_Do} ${docenteData.apellidoM_Do} ${docenteData.nombres_Do}`;
          //console.log('docente obtencion',this.nombre);
          this.boleta = docenteData.noTrabajador;
        }
      });
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

                const horariosObservables = this.combinados.map(grupoCombinado =>
                  this.horariosService.getHorario(grupoCombinado.g_idmaterias, grupoCombinado.idgrupos)
                );

                forkJoin(horariosObservables).subscribe(allHorarios => {
                  const elementData = this.combinados.map((grupoCombinado, index) => {
                    const horariosData = allHorarios[index];
                    let lunes, martes, miercoles, jueves, viernes: string = '';
                    let lunesS, martesS, miercolesS, juevesS, viernesS: string = '';
                    horariosData.forEach((horario: any) => {
                      switch (horario.dia) {
                        case 'LUNES':
                          lunes = horario.entrada
                          lunesS = horario.salida
                          break
                        case 'MARTES':
                          martes = horario.entrada
                          martesS = horario.salida
                          break
                        case 'MIERCOLES':
                          miercoles = horario.entrada
                          miercolesS = horario.salida
                          break
                        case 'JUEVES':
                          jueves = horario.entrada
                          juevesS = horario.salida
                          break
                        case 'VIERNES':
                          viernes = horario.entrada
                          viernesS = horario.salida
                          break
                      }
                    })
                    return {
                      materia: grupoCombinado.material,
                      grupo: this.separarGrupo(grupoCombinado.idgrupos),
                      docente: this.separarGrupo(grupoCombinado.idgrupos),
                      lunesEntrada: lunes || '',
                      lunesSalida: lunesS || '',
                      martesEntrada: martes || '',
                      martesSalida: martesS || '',
                      miercolesEntrada: miercoles || '',
                      miercolesSalida: miercolesS || '',
                      juevesEntrada: jueves || '',
                      juevesSalida: juevesS || '',
                      viernesEntrada: viernes || '',
                      viernesSalida: viernesS || ''
                      // Completa el objeto Horario aquí
                    };
                  });
                  this.dataSource = elementData; // Asigna los datos solo después de completar todas las llamadas
                });
            }
          });
        });
    } else {

      this.alumnoService.obtenerAlumno(this.userId!).pipe(
        catchError(this.handleError)
      ).subscribe(docenteData => {
        if (docenteData) {
          this.nombre = `${docenteData.apellidoP_Al} ${docenteData.apellidoM_Al} ${docenteData.nombres_Al}`;
          //console.log('docente obtencion',this.nombre);
          this.boleta = docenteData.noTrabajador;
        }
      });
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

              const horariosObservables = this.combinados.map(grupoCombinado =>
                this.horariosService.getHorario(grupoCombinado.g_idmaterias, grupoCombinado.idgrupos)
              );

              forkJoin(horariosObservables).subscribe(allHorarios => {
                const elementData = this.combinados.map((grupoCombinado, index) => {
                  const horariosData = allHorarios[index];
                  let lunes, martes, miercoles, jueves, viernes: string = '';
                  let lunesS, martesS, miercolesS, juevesS, viernesS: string = '';
                  horariosData.forEach((horario: any) => {
                    switch (horario.dia) {
                      case 'LUNES':
                        lunes = horario.entrada
                        lunesS = horario.salida
                        break
                      case 'MARTES':
                        martes = horario.entrada
                        martesS = horario.salida
                        break
                      case 'MIERCOLES':
                        miercoles = horario.entrada
                        miercolesS = horario.salida
                        break
                      case 'JUEVES':
                        jueves = horario.entrada
                        juevesS = horario.salida
                        break
                      case 'VIERNES':
                        viernes = horario.entrada
                        viernesS = horario.salida
                        break
                    }
                  })
                  return {
                    materia: grupoCombinado.material,
                    grupo: this.separarGrupo(grupoCombinado.idgrupos),
                    docente: grupoCombinado.docente,
                    lunesEntrada: lunes || '',
                    lunesSalida: lunesS || '',
                    martesEntrada: martes || '',
                    martesSalida: martesS || '',
                    miercolesEntrada: miercoles || '',
                    miercolesSalida: miercolesS || '',
                    juevesEntrada: jueves || '',
                    juevesSalida: juevesS || '',
                    viernesEntrada: viernes || '',
                    viernesSalida: viernesS || ''
                    // Completa el objeto Horario aquí
                  };
                });
                this.dataSource = elementData; // Asigna los datos solo después de completar todas las llamadas
              });

            //console.log(this.combinados);
          }
        });
      });

    }
  }


  separarGrupo(grupoCom: string): string {
    const grupoSeparado = grupoCom.split("-");
    var grupoBase = grupoSeparado[0];
    return grupoBase;
  }
  agregarFila() {
    const nuevaFila: Horario = {
      materia: '',
      grupo: '',
      docente: '',
      lunesEntrada: '',
      lunesSalida: '',
      martesEntrada: '',
      martesSalida: '',
      miercolesEntrada: '',
      miercolesSalida: '',
      juevesEntrada: '',
      juevesSalida: '',
      viernesEntrada: '',
      viernesSalida: ''
    };
    this.dataSource = [...this.dataSource, nuevaFila];
  }

  buttonFocus: boolean = false;

  onFocus(focused: boolean): void {
    this.buttonFocus = focused;
  }

  private handleError(error: any) {
    console.error('Error:', error);
    //alert('Ocurrió un error. Por favor, inténtelo de nuevo.');
    return of(null);
  }

  ngAfterViewInit() {
    const timeInputs = document.querySelectorAll('input[type="time"]');
    if (!this.isDocente) {
      this.displayedColumns = ['grupo', 'materia', 'docente', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'acciones']
    }
    timeInputs.forEach(input => {
      input.addEventListener('click', () => {
        (input as HTMLInputElement).showPicker();
      });
    });
  }

}
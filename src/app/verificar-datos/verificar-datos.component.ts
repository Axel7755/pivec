import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LateralLogin } from '../loging-regis/sub-componentes/lateral.component';
import { LoginFormComponent } from '../loging-regis/sub-componentes/login-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistroDataService, RegistroData } from '../registro-data.service';
import { DocentesService } from '../servicios/docentes.service';
import { MateriasService } from '../servicios/materias.service';
import { GruposService } from '../servicios/grupos.service';
import { HorariosService } from '../servicios/horarios.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';


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
  selector: 'app-verificar-datos',
  standalone: true,
  imports: [MatSidenavModule,
    MatTableModule,
    LateralLogin,
    LoginFormComponent,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './verificar-datos.component.html',
  styleUrl: './verificar-datos.component.css'
})

export class VerificarDatosComponent implements OnInit {
  currentDate = new Date();
  futureDate = this.formatDateForMySQL(this.addMonths(this.currentDate, 5));
  formattedDate = this.formatDateForMySQL(this.currentDate);
  nombre: string = '';
  boleta: string = '';
  dataSource: Horario[] = [];
  displayedColumns: string[] = ['materia', 'docente', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  data: RegistroData = {
    nombre: '',
    boleta: '',
    conthash: '',
    correo: '',
    materias: {},
    grupos: {},
    docentes: {},
    lunes: {},
    martes: {},
    miercoles: {},
    jueves: {},
    viernes: {}
  };

  constructor(private dataService: RegistroDataService, private docentesService: DocentesService,
    private materiasService: MateriasService, private gruposService: GruposService,
    private horariosService: HorariosService
  ) { }
  ngAfterViewInit() {
    const timeInputs = document.querySelectorAll('input[type="time"]');
    if (!(Object.keys(this.data.grupos).length === 0)) {
      this.displayedColumns = ['grupo', 'materia', 'docente', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes']
    }
    timeInputs.forEach(input => {
      input.addEventListener('click', () => {
        (input as HTMLInputElement).showPicker();
      });
    });
  }

  ngOnInit() {
    this.dataService.currentData.subscribe(data => this.data = data);
    this.nombre = this.data.nombre
    this.boleta = this.data.boleta
    const outerKeys = Object.keys(this.data.docentes).map(key => Number(key)); // Obtiene las claves del primer nivel
    outerKeys.forEach(outerKey => {
      const [inicioL, endL] = this.separarHoras(this.data.lunes[outerKey - 1])
      const [inicioM, endM] = this.separarHoras(this.data.martes[outerKey - 1])
      const [inicioMi, endMi] = this.separarHoras(this.data.miercoles[outerKey - 1])
      const [inicioJ, endJ] = this.separarHoras(this.data.jueves[outerKey - 1])
      const [inicioV, endV] = this.separarHoras(this.data.viernes[outerKey - 1])


      this.dataSource.push({
        grupo: this.data.grupos[outerKey],
        materia: this.data.materias[outerKey],
        docente: this.data.docentes[outerKey],
        lunesEntrada: inicioL,
        lunesSalida: endL,
        martesEntrada: inicioM,
        martesSalida: endM,
        miercolesEntrada: inicioMi,
        miercolesSalida: endMi,
        juevesEntrada: inicioJ,
        juevesSalida: endJ,
        viernesEntrada: inicioV,
        viernesSalida: endV
      });
    });
  }
  //boleta: string = '';  // Valor predefinido para la boleta
  //nombre: string = 'Luis Francisco Lopez Lopez';  // Valor predefinido para el nombre
  //conthash: string = 'Luis Francisco Lopez Lopez';

  guardarUsuario() {
    this.nombre = this.transformToUpperCase(this.nombre);
    const partes = this.nombre.split(" ");
    const apellidoPaterno = partes[0];
    const apellidoMaterno = partes[1];
    const nombre = partes.slice(2).join(" ");
    if (!(Object.keys(this.data.grupos).length === 0)) {
      const alumno = {
        boleta: this.boleta,
        nombres_Al: nombre,
        apellidoP_Al: apellidoPaterno,
        apellidoM_Al: apellidoMaterno,
        contraseña_Al: this.data.conthash,
        correoRec_Al: this.data.correo
      };
      // Guardar alumno...
    } else {
      const docente = {
        noTrabajador: this.boleta,
        nombres_Do: nombre,
        apellidoP_Do: apellidoPaterno,
        apellidoM_Do: apellidoMaterno,
        contraseña_Do: this.data.conthash,
        correoRec_Do: this.data.correo
      };
    
      this.docentesService.createDocente(docente).pipe(
        catchError(error => {
          console.error('Error al crear el docente', error);
          return of(null);
        })
      ).subscribe({
        next: response => {
          console.log('Docente creado exitosamente', response);
          this.dataSource.forEach(grupoData => {
            const materia = { material: grupoData.materia };
            this.materiasService.createMateria(materia).pipe(
              catchError(error => {
                console.error('Error al crear la materia', error);
                return of(null);
              })
            ).subscribe(materiaResponse => {
              if (materiaResponse) {
                const grupo = {
                  g_idmaterias: materiaResponse.idmaterias,
                  g_doc_noTrabajador: this.boleta,
                  idgrupos: grupoData.docente,
                  fechin: this.formattedDate,
                  fechfin: this.futureDate
                };
                //console.log(grupo)
                this.gruposService.createGrupo(grupo).pipe(
                  catchError(error => {
                    console.error('Error al crear el grupo', error);
                    return of(null);
                  })
                ).subscribe(grupoResponse => {
                  console.log('Grupo creado exitosamente', grupoResponse);
                  
                  const horarios = [
                    { dia: 'LUNES', entrada: grupoData.lunesEntrada, salida: grupoData.lunesSalida },
                    { dia: 'MARTES', entrada: grupoData.martesEntrada, salida: grupoData.martesSalida },
                    { dia: 'MIERCOLES', entrada: grupoData.miercolesEntrada, salida: grupoData.miercolesSalida },
                    { dia: 'JUEVES', entrada: grupoData.juevesEntrada, salida: grupoData.juevesSalida },
                    { dia: 'VIERNES', entrada: grupoData.viernesEntrada, salida: grupoData.viernesSalida }
                  ];
    
                  horarios.forEach(horarioData => {
                    const horario = {
                      dia: horarioData.dia,
                      entrada: horarioData.entrada,
                      salida: horarioData.salida,
                      ho_idmaterias: materiaResponse.idmaterias,
                      ho_idgrupos: grupoData.docente
                    };
                    console.log(horario)
                    this.horariosService.createHorario(horario).pipe(
                      catchError(error => {
                        console.error(`Error al crear el horario de ${horarioData.dia}`, error);
                        return of(null);
                      })
                    ).subscribe(horarioResponse => {
                      console.log(`Horario de ${horarioData.dia} creado exitosamente`, horarioResponse);
                    });
                  });
                });
              }
            });
          });
        },
        error: error => console.error('Error al crear el docente', error),
        complete: () => console.log('Solicitud de creación de docente completada')
      });
    }

  }
  separarHoras(timeRange: string): [string, string] {
    const times = timeRange.split(" - ");
    var startTime = times[0];
    var endTime = times[1];
    if (startTime.length == 4) {
      startTime = "0" + startTime;
    }

    if (endTime !== null && endTime !== undefined && endTime.length == 4) {
      endTime = "0" + endTime;
    }
    if (endTime == null && endTime == undefined){
      endTime="";
    }
    return [startTime, endTime];
  }

  transformToUpperCase(value: string): string {
    return value ? value.toUpperCase() : '';
  }

  padTo2Digits(num: number): string {
    return num.toString().padStart(2, '0');
  }

  formatDateForMySQL(date: Date): string {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours()),
        this.padTo2Digits(date.getMinutes()),
        this.padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }
  addMonths(date: Date, months: number): Date {
    let result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }



}
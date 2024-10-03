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


export interface Horario {
  materia: string;
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

const ELEMENT_DATA: Horario[] = [];

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
  nombre: string = '';
  boleta: string = '';
  data: RegistroData = { 
    nombre: '', 
    boleta: '',
    conthash: '',
    correo: '', 
    materias: {},
    docentes: {},
    lunes: {},
    martes: {},
    miercoles: {},
    jueves: {},
    viernes: {}
  };

  constructor(private dataService: RegistroDataService) {}
  ngAfterViewInit() {
    const timeInputs = document.querySelectorAll('input[type="time"]');
    
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
      const [inicioL, endL] = this.separarHoras(this.data.lunes[outerKey-1])
      const [inicioM, endM] = this.separarHoras(this.data.martes[outerKey-1])
      const [inicioMi, endMi] = this.separarHoras(this.data.miercoles[outerKey-1])
      const [inicioJ, endJ] = this.separarHoras(this.data.jueves[outerKey-1])
      const [inicioV, endV] = this.separarHoras(this.data.viernes[outerKey-1])
      
      ELEMENT_DATA.push({
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
 
  
  separarHoras(timeRange: string): [string, string] {
    const times = timeRange.split(" - ");
    var startTime = times[0];
    var endTime = times[1];
    if(startTime.length == 4){
      startTime="0"+startTime;
    }
    
    if(endTime!== null && endTime !== undefined && endTime.length == 4){
      endTime="0"+endTime;
    }
    return [startTime, endTime];
  }
  displayedColumns: string[] = ['materia', 'docente', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dataSource = ELEMENT_DATA;

}
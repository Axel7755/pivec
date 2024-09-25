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

const ELEMENT_DATA: Horario[] = [
  {
    materia: 'Matemáticas',
    docente: 'Dr. Smith',
    lunesEntrada: '08:30',
    lunesSalida: '09:30',
    martesEntrada: '10:00',
    martesSalida: '11:00',
    miercolesEntrada: '12:00',
    miercolesSalida: '13:00',
    juevesEntrada: '14:00',
    juevesSalida: '15:00',
    viernesEntrada: '08:30',
    viernesSalida: '09:30'
  },
  {
    materia: 'Física',
    docente: 'Mtra. Johnson',
    lunesEntrada: '09:30',
    lunesSalida: '10:30',
    martesEntrada: '11:00',
    martesSalida: '12:00',
    miercolesEntrada: '13:00',
    miercolesSalida: '14:00',
    juevesEntrada: '15:00',
    juevesSalida: '16:00',
    viernesEntrada: '09:30',
    viernesSalida: '10:30'
  },
  {
    materia: 'Química',
    docente: 'Dr. Brown',
    lunesEntrada: '10:30',
    lunesSalida: '11:30',
    martesEntrada: '12:00',
    martesSalida: '13:00',
    miercolesEntrada: '14:00',
    miercolesSalida: '15:00',
    juevesEntrada: '16:00',
    juevesSalida: '17:00',
    viernesEntrada: '10:30',
    viernesSalida: '11:30'
  },
  {
    materia: 'Historia',
    docente: 'Mtro. Taylor',
    lunesEntrada: '11:30',
    lunesSalida: '12:30',
    martesEntrada: '13:00',
    martesSalida: '14:00',
    miercolesEntrada: '15:00',
    miercolesSalida: '16:00',
    juevesEntrada: '08:30',
    juevesSalida: '09:30',
    viernesEntrada: '11:30',
    viernesSalida: '12:30'
  },
  {
    materia: 'Inglés',
    docente: 'Mtra. Davis',
    lunesEntrada: '12:30',
    lunesSalida: '13:30',
    martesEntrada: '14:00',
    martesSalida: '15:00',
    miercolesEntrada: '16:00',
    miercolesSalida: '17:00',
    juevesEntrada: '09:30',
    juevesSalida: '10:30',
    viernesEntrada: '12:30',
    viernesSalida: '13:30'
  },
];

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
  data: RegistroData = { 
    nombre: '', 
    boleta: '',
    conthash: '',
    correo: '', 
    materia: [], 
    profesor: [], 
    lunes: [], 
    martes: [], 
    miercoles: [], 
    jueves: [], 
    viernes: [] 
  };

  constructor(private dataService: RegistroDataService) {}

  ngOnInit() {
    this.dataService.currentData.subscribe(data => this.data = data);
  }
  boleta: string = '2021670048';  // Valor predefinido para la boleta
  nombre: string = 'Luis Francisco Lopez Lopez';  // Valor predefinido para el nombre
  conthash: string = 'Luis Francisco Lopez Lopez';
  
  displayedColumns: string[] = ['materia', 'docente', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dataSource = ELEMENT_DATA;

}
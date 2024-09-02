import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LateralLogin } from '../loging-regis/sub-componentes/lateral.component';
import { LoginFormComponent } from '../loging-regis/sub-componentes/login-form.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';


export interface Horario {
  materia: string;
  docente: string;
  lunes: string;
  martes: string;
  miercoles: string;
  jueves: string;
  viernes: string;
} 

const ELEMENT_DATA: Horario[] = [
  {
    materia: 'Matemáticas',
    docente: 'Dr. Smith',
    lunes: '08:30 - 09:30',
    martes: '10:00 - 11:00',
    miercoles: '12:00 - 13:00',
    jueves: '14:00 - 15:00',
    viernes: '08:30 - 09:30'
  },
  {
    materia: 'Física',
    docente: 'Mtra. Johnson',
    lunes: '09:30 - 10:30',
    martes: '11:00 - 12:00',
    miercoles: '13:00 - 14:00',
    jueves: '15:00 - 16:00',
    viernes: '09:30 - 10:30'
  },
  {
    materia: 'Química',
    docente: 'Dr. Brown',
    lunes: '10:30 - 11:30',
    martes: '12:00 - 13:00',
    miercoles: '14:00 - 15:00',
    jueves: '16:00 - 17:00',
    viernes: '10:30 - 11:30'
  },
  {
    materia: 'Historia',
    docente: 'Mtro. Taylor',
    lunes: '11:30 - 12:30',
    martes: '13:00 - 14:00',
    miercoles: '15:00 - 16:00',
    jueves: '08:30 - 09:30',
    viernes: '11:30 - 12:30'
  },
  {
    materia: 'Inglés',
    docente: 'Mtra. Davis',
    lunes: '12:30 - 13:30',
    martes: '14:00 - 15:00',
    miercoles: '16:00 - 17:00',
    jueves: '09:30 - 10:30',
    viernes: '12:30 - 13:30'
  },
];

@Component({
  selector: 'app-verificar-datos',
  standalone: true,
  imports: [MatSidenavModule,
    MatTableModule,
    LateralLogin,
    LoginFormComponent,
    MatButtonModule],
  templateUrl: './verificar-datos.component.html',
  styleUrl: './verificar-datos.component.css'
})
export class VerificarDatosComponent {
  displayedColumns: string[] = ['materia', 'docente', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dataSource = ELEMENT_DATA;
}
import { Component, OnInit, Inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
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
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { AlumnosService } from '../servicios/alumnos.service';
import { GruposAlumnosService } from '../servicios/grupos-alumnos.service';
import { Router } from '@angular/router';

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
  { materia: 'Matemáticas', docente: 'Dr. Smith', lunesEntrada: '08:30', lunesSalida: '09:30', martesEntrada: '10:00', martesSalida: '11:00', miercolesEntrada: '12:00', miercolesSalida: '13:00', juevesEntrada: '14:00', juevesSalida: '15:00', viernesEntrada: '08:30', viernesSalida: '09:30' },
  { materia: 'Física', docente: 'Mtra. Johnson', lunesEntrada: '09:30', lunesSalida: '10:30', martesEntrada: '11:00', martesSalida: '12:00', miercolesEntrada: '13:00', miercolesSalida: '14:00', juevesEntrada: '15:00', juevesSalida: '16:00', viernesEntrada: '09:30', viernesSalida: '10:30' },
  { materia: 'Química', docente: 'Dr. Brown', lunesEntrada: '10:30', lunesSalida: '11:30', martesEntrada: '12:00', martesSalida: '13:00', miercolesEntrada: '14:00', miercolesSalida: '15:00', juevesEntrada: '16:00', juevesSalida: '17:00', viernesEntrada: '10:30', viernesSalida: '11:30' },
];

@Component({
  selector: 'app-verificar-datos-gral',
  standalone: true,
  imports: [MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule],
  templateUrl: './verificar-datos-gral.component.html',
  styleUrl: './verificar-datos-gral.component.css'
})

export class VerificarDatosGralComponent {

  boleta: string = '2021670048';
  nombre: string = 'Luis Francisco Lopez Lopez';

  displayedColumns: string[] = ['materia', 'docente', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
  dataSource = ELEMENT_DATA;

  days = [
    { key: 'lunes', label: 'Lunes' },
    { key: 'martes', label: 'Martes' },
    { key: 'miercoles', label: 'Miércoles' },
    { key: 'jueves', label: 'Jueves' },
    { key: 'viernes', label: 'Viernes' },
  ];

}
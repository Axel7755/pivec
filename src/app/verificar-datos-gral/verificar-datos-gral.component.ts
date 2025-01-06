import { Component, OnInit, Inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

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
];

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

export class VerificarDatosGralComponent {

  boleta: string = '2021670048';
  nombre: string = 'Luis Francisco Lopez Lopez';

  displayedColumns: string[] = ['materia', 'docente', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'acciones'];
  dataSource = ELEMENT_DATA;

  eliminarFila(index: number) {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar esta fila?');
    if (confirmation) {
      this.dataSource.splice(index, 1); // Eliminar el elemento en el índice especificado
      this.dataSource = [...this.dataSource]; // Actualizar la referencia para que Angular detecte el cambio
    }
  }

  agregarFila() {
    const nuevaFila: Horario = {
      materia: '',
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


}
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegistroDataService } from '../../registro-data.service';
import { FormControl,FormGroup,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule,
    RouterLink, RouterOutlet, ReactiveFormsModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  formReg = new FormGroup({
    nombreC: new FormControl(''),
    boleta: new FormControl(''),
  })

  nombre = "Axel Tomas Baltierra Hernandez";
  boleta = "3456213454356";
  conthash = "3456213454356";
  materia = ['a', 'b', 'c'];
  profesor = ['a', 'b', 'c'];
  lunes = ['a', 'b', 'c'];
  martes = ['a', 'b', 'c'];
  miercoles = ['a', 'b', 'c'];
  jueves = ['a', 'b', 'c'];
  viernes = ['a', 'b', 'c'];
  constructor(private dataService: RegistroDataService) { }

  sendData() {
    const data = {
      nombre: this.nombre,
      boleta: this.boleta,
      conthash: this.conthash,
      materia: this.materia,
      profesor: this.profesor,
      lunes: this.lunes,
      martes: this.martes,
      miercoles: this.miercoles,
      jueves: this.jueves,
      viernes: this.viernes
    };
    this.dataService.changeData(data);
  }
}

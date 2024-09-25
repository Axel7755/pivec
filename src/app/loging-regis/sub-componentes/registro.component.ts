import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegistroDataService } from '../../registro-data.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PdfToExcelService } from '../../pdf-excel.service';

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
  srcResult: any;

  formReg = new FormGroup({
    contr: new FormControl(''),
    confcontr: new FormControl(''),
    recCorreo: new FormControl(''),
  })
  nombre = "Axel Tomas Baltierra Hernandez";
  boleta = "3456213454356";
  cont = '';
  confcont = '';
  conthash = "3456213454356";
  correo = "baxeltomas@gmail.com"
  materia = ['a', 'b', 'c'];
  profesor = ['a', 'b', 'c'];
  lunes = ['a', 'b', 'c'];
  martes = ['a', 'b', 'c'];
  miercoles = ['a', 'b', 'c'];
  jueves = ['a', 'b', 'c'];
  viernes = ['a', 'b', 'c'];
  constructor(private dataService: RegistroDataService, private pdfToExcelService: PdfToExcelService) { }


  obtenerDataForm() {
    const inputNode: any = document.querySelector('#file');
    inputNode.click()
    this.cont = this.formReg.value.contr ?? '';
    this.confcont = this.formReg.value.confcontr ?? '';
    this.correo = this.formReg.value.recCorreo ?? '';
    console.log(this.cont, this.confcont, this.correo)
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      const file: File = inputNode.files[0];
      if (file) {
        this.pdfToExcelService.convertPdfToExcel(file);
      }
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
  sendData() {
    const data = {
      nombre: this.nombre,
      boleta: this.boleta,
      conthash: this.conthash,
      correo: this.correo,
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

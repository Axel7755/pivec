import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RegistroDataService } from '../../registro-data.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
//import { PdfToExcelService } from '../../pdf-excel.service';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/js/pdf.worker.mjs';

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
  nombre = '';
  boleta = '';
  cont = '';
  confcont = '';
  conthash = "3456213454356";
  correo = "baxeltomas@gmail.com"

  materias: { [key: number]: string } = {};
  docentes: { [key: number]: string } = {};
  lunes: { [key: number]: string } = {};
  martes: { [key: number]: string } = {};
  miercoles: { [key: number]: string } = {};
  jueves: { [key: number]: string } = {};
  viernes: { [key: number]: string } = {};

  formReg = new FormGroup({
    contr: new FormControl(''),
    confcontr: new FormControl(''),
    recCorreo: new FormControl(''),
  })
  constructor(private dataService: RegistroDataService) { }


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
        this.convertPdfToExcel(file);
        /*console.log(this.boleta);
        console.log(this.nombre);
        console.log(this.jueves);*/
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
      materias: this.materias,
      docentes: this.docentes,
      lunes: this.lunes,
      martes: this.martes,
      miercoles: this.miercoles,
      jueves: this.jueves,
      viernes: this.viernes
    };
    this.dataService.changeData(data);
  }

  async convertPdfToExcel(file: File) {
    const pdfBytes = await file.arrayBuffer();

    // Usar pdfjs-dist para extraer el texto
    const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();

    // Procesar el contenido del texto para extraer los datos necesarios
    const items = textContent.items as any[];
    //console.log(textContent);
    const rows: { [key: number]: { [key: number]: string } } = {};
    var i = 0;

    items.forEach((item) => {
      switch (item.str) {
        case 'Boleta:':
          this.boleta = items[i + 2].str;
          break;
        case 'Nombre:':
          this.nombre = items[i + 2].str;
          break;
      }
      i++;
      const transform = item.transform;
      const x = transform[4];
      const y = transform[5];

      // Redondear las coordenadas para agrupar elementos cercanos
      const row = Math.round(y / 8);
      const col = Math.round(x / 8);

      if (!rows[row]) {
        rows[row] = {};
      }
      rows[row][col] = item.str;
    });
    this.materias = rows[8];
    this.docentes = rows[32];
    //console.log(this.docentes);

    const outerKeys = Object.keys(this.docentes).map(key => Number(key)); // Obtiene las claves del primer nivel
    outerKeys.forEach(outerKey => {
        if(rows[48][outerKey-1]){
          this.lunes[outerKey-1]=rows[48][outerKey-1];
        }else{
          this.lunes[outerKey-1]='';
        }
        if(rows[58][outerKey-1]){
          this.martes[outerKey-1]=rows[58][outerKey-1];
        }else{
          this.martes[outerKey-1]='';
        }
        if(rows[68][outerKey-1]){
        this.miercoles[outerKey-1]=rows[68][outerKey-1];
        }else{
          this.miercoles[outerKey-1]='';
        }
        if(rows[78][outerKey-1]){
        this.jueves[outerKey-1]=rows[78][outerKey-1];
        }else{
          this.jueves[outerKey-1]='';
        }
        if(rows[88][outerKey-1]){
        this.viernes[outerKey-1]=rows[88][outerKey-1]; // Imprime cada valor
        }else{
          this.viernes[outerKey-1]='';
        }
    });
  }
}

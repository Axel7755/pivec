import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { RegistroDataService } from '../../registro-data.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { FormControl, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import * as pdfjsLib from 'pdfjs-dist';
import * as XLSX from 'xlsx';

pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/js/pdf.worker.mjs';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule,
    RouterLink, ReactiveFormsModule, FormsModule
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
  conthash = "";
  correo = ""

  materias: { [key: number]: string } = {};
  grupos: { [key: number]: string } = {};
  docentes: { [key: number]: string } = {};
  lunes: { [key: number]: string } = {};
  martes: { [key: number]: string } = {};
  miercoles: { [key: number]: string } = {};
  jueves: { [key: number]: string } = {};
  viernes: { [key: number]: string } = {};

  formReg = new FormGroup({
    contr: new FormControl(''),
    confcontr: new FormControl(''),
    recCorreo: new FormControl('', [Validators.required, Validators.email]),
  })
  errorMessage = '';
  constructor(private dataService: RegistroDataService, public dialog: MatDialog, 
      private router: Router,) {
    merge(this.formReg.controls.recCorreo.statusChanges, this.formReg.controls.recCorreo.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  updateErrorMessage() {
    if (this.formReg.controls.recCorreo.hasError('required')) {
      this.errorMessage = 'Ingrese un valor';
    } else if (this.formReg.controls.recCorreo.hasError('email')) {
      this.errorMessage = 'No es un email valido';
    } else {
      this.errorMessage = '';
    }
  }

  obtenerDataForm() {
    const inputNode: any = document.querySelector('#file');
    //inputNode.click()
    this.cont = this.formReg.value.contr ?? '';
    this.confcont = this.formReg.value.confcontr ?? '';
    this.correo = this.formReg.value.recCorreo ?? '';
    if (this.cont != this.confcont) {
      this.openDialog();
      //this.formReg.value.recCorreo = '';
    } else {
      this.conthash = this.cont
      inputNode.click()
    }
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      if (inputNode?.files?.length > 0) {
        const file: File = inputNode.files[0];
        const fileExtension = file.name?.split('.').pop()?.toLowerCase();

        if (fileExtension === 'pdf') {
          // Lógica para manejar PDF
          this.extraerPdf(file);
        } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {

          this.extraerExcel(file);
        } else {
          console.log('Tipo de archivo no soportado');
        }

      } else {
        console.log('No se ha seleccionado ningún archivo');
      }
    }
  }

  extraerExcel(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const dataex: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const datosMaterias: any[][] = [];
      const datosEstructurados: any[][] = [];

      principal: for (let i = 0; i < dataex.length; i++) {
        for (let j = 0; j < dataex[i].length; j++) {
          if (dataex[i][j] && dataex[i][j].toString().includes('GRUPO')) {
            var z = 0;
            for (let y = i + 1; y < dataex.length; y++) {
              for (let x = 0; x < dataex[y].length; x++) {
                if (dataex[y][x] && dataex[y][x].toString().includes('SUBTOTAL')) {
                  break principal;
                }
              }
              datosMaterias[z] = dataex[y]
              z++;
            }
          }
        }
      }

      datosEstructurados[0] = datosMaterias[0];

      var auxArreglado = 0;
      var aux = 0;
      datosMaterias.forEach((datMat) => {
        if (datosEstructurados[auxArreglado][1] == datMat[1] && datosEstructurados[auxArreglado][5] == datMat[5]) {
          for (let x = 8; x < 13; x++) {
            if (datMat[x]) {
              if (!datosEstructurados[auxArreglado][x]) {
                datosEstructurados[auxArreglado][x] = datMat[x]
              }

            }
          }
        } else {
          auxArreglado++
          datosEstructurados[auxArreglado] = datMat;
        }
        aux++;
      });

      datosEstructurados.forEach((datEst) => {
        this.materias[Object.keys(this.materias).length + 1] = datEst[1];
        this.docentes[Object.keys(this.docentes).length + 1] = datEst[5];
        if (datEst[8]) {
          this.lunes[Object.keys(this.docentes).length - 1] = datEst[8];
        } else {
          this.lunes[Object.keys(this.docentes).length - 1] = '';
        }
        if (datEst[9]) {
          this.martes[Object.keys(this.docentes).length - 1] = datEst[9];
        } else {
          this.martes[Object.keys(this.docentes).length - 1] = '';
        }
        if (datEst[10]) {
          this.miercoles[Object.keys(this.docentes).length - 1] = datEst[10];
        } else {
          this.miercoles[Object.keys(this.docentes).length - 1] = '';
        }
        if (datEst[11]) {
          this.jueves[Object.keys(this.docentes).length - 1] = datEst[11];
        } else {
          this.jueves[Object.keys(this.docentes).length - 1] = '';
        }
        if (datEst[12]) {
          this.viernes[Object.keys(this.docentes).length - 1] = datEst[12];
        } else {
          this.viernes[Object.keys(this.docentes).length - 1] = '';
        }
      });

    };
    reader.readAsBinaryString(file);
  }

  sendData() {
    this.cont = this.formReg.value.contr ?? '';
    this.confcont = this.formReg.value.confcontr ?? '';
    if (this.cont != this.confcont) {
      this.openDialog();
      //this.formReg.value.recCorreo = '';
    } else {
      this.conthash = this.cont

      const data = {
        nombre: this.nombre,
        boleta: this.boleta,
        conthash: this.conthash,
        correo: this.correo,
        materias: this.materias,
        grupos: this.grupos,
        docentes: this.docentes,
        lunes: this.lunes,
        martes: this.martes,
        miercoles: this.miercoles,
        jueves: this.jueves,
        viernes: this.viernes
      };
      this.dataService.changeData(data);
      this.router.navigate(['/login/verificar-datos'])
    }
  }

  async extraerPdf(file: File) {
    const pdfBytes = await file.arrayBuffer();

    // Usar pdfjs-dist para extraer el texto
    const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();

    // Procesar el contenido del texto para extraer los datos necesarios
    const items = textContent.items as any[];
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
    console.log(rows[8])

    const Keysmats = Object.keys(this.materias).map(key => Number(key));

    Keysmats.forEach(mate => {
      this.materias[mate] = this.materias[mate].split(" - ")[1];
    })

    console.log(this.materias)

    const outerKeys = Object.keys(this.docentes).map(key => Number(key)); // Obtiene las claves del primer nivel
    outerKeys.forEach(outerKey => {

      if (rows[5][outerKey]) {
        this.grupos[outerKey] = rows[5][outerKey];
      }

      //asignación de las horas
      if (rows[48][outerKey - 1]) {
        this.lunes[outerKey - 1] = rows[48][outerKey - 1];
      } else {
        if (rows[48][outerKey]) {
          this.lunes[outerKey - 1] = rows[48][outerKey];
        } else {
          this.lunes[outerKey - 1] = '';
        }
      }
      if (rows[58][outerKey - 1]) {
        this.martes[outerKey - 1] = rows[58][outerKey - 1];
      } else {
        if (rows[58][outerKey]) {
          this.martes[outerKey - 1] = rows[58][outerKey];
        } else {
          this.martes[outerKey - 1] = '';
        }
      }
      if (rows[68][outerKey - 1]) {
        this.miercoles[outerKey - 1] = rows[68][outerKey - 1];
      } else {
        if (rows[68][outerKey]) {
          this.miercoles[outerKey - 1] = rows[68][outerKey];
        } else {
          this.miercoles[outerKey - 1] = '';
        }
      }
      if (rows[78][outerKey - 1]) {
        this.jueves[outerKey - 1] = rows[78][outerKey - 1];
      } else {
        if (rows[78][outerKey]) {
          this.jueves[outerKey - 1] = rows[78][outerKey];
        } else {
          this.jueves[outerKey - 1] = '';
        }
      }
      if (rows[88][outerKey - 1]) {
        this.viernes[outerKey - 1] = rows[88][outerKey - 1]; // Imprime cada valor
      } else {
        if (rows[88][outerKey]) {
          this.viernes[outerKey - 1] = rows[88][outerKey];
        } else {
          this.viernes[outerKey - 1] = '';
        }
      }
    });
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-contError.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogElementsExampleDialog { }

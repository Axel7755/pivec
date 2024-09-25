import { Injectable } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';
import * as XLSX from 'xlsx';

pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/js/pdf.worker.mjs';

@Injectable({
  providedIn: 'root'
})
export class PdfToExcelService {
  boleta: string = '';
  nombre: string = '';
  materias: { [key: number]: string } = {};
  docentes: { [key: number]: string } = {};
  lunes: { [key: number]: string } = {};
  martes: { [key: number]: string } = {};
  miercoles: { [key: number]: string } = {};
  jueves: { [key: number]: string } = {};
  viernes: { [key: number]: string } = {};

  async convertPdfToExcel(file: File) {
    const pdfBytes = await file.arrayBuffer();
    //const pdfDoc = await PDFDocument.load(pdfBytes);
    //const pages = pdfDoc.getPages();
    const data: string[][] = [];

    // Usar pdfjs-dist para extraer el texto
    const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const textContent = await page.getTextContent();

    // Procesar el contenido del texto para extraer los datos necesarios
    const items = textContent.items as any[];
    console.log(textContent);
    let currentRow: string[] = [];
    const rows: { [key: number]: { [key: number]: string } } = {};
    var i = 0;

    items.forEach((item) => {
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
    console.log(this.docentes);

    const outerKeys = Object.keys(this.docentes).map(key => Number(key)); // Obtiene las claves del primer nivel
    outerKeys.forEach(outerKey => {
        if(rows[48][outerKey-1]){
          this.lunes[outerKey-1]=rows[48][outerKey-1];
        }else{
          this.lunes[outerKey-1]='';
        }
        this.martes[outerKey-1]=rows[58][outerKey-1];
        this.miercoles[outerKey-1]=rows[68][outerKey-1];
        this.jueves[outerKey-1]=rows[78][outerKey-1];
        this.viernes[outerKey-1]=rows[88][outerKey-1]; // Imprime cada valor
      
    });


    console.log(this.jueves);

    items.forEach((item) => {
      switch (item.str) {
        case 'Boleta:':
          this.boleta = items[i + 2].str;
          currentRow.push(items[i + 2].str);
          break;
        case 'Nombre:':
          this.nombre = items[i + 2].str;
          currentRow.push(items[i + 2].str);
          break;
      }
      i++;
    });
    if (currentRow.length > 0) {
      data.push(currentRow);
    }
  }

  async convertPdfToExcel2(file: File) {
    const pdfBytes = await file.arrayBuffer();
    const data: string[][] = [];

    // Usar pdfjs-dist para extraer el texto
    const loadingTask = pdfjsLib.getDocument({ data: pdfBytes });
    const pdf = await loadingTask.promise;

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const items = textContent.items as any[];

      // Crear una matriz para almacenar las filas y columnas
      const rows: { [key: number]: { [key: number]: string } } = {};

      items.forEach((item) => {
        const transform = item.transform;
        const x = transform[4];
        const y = transform[5];

        // Redondear las coordenadas para agrupar elementos cercanos
        const row = Math.round(y / 10);
        const col = Math.round(x / 10);

        if (!rows[row]) {
          rows[row] = {};
        }
        rows[row][col] = item.str;
      });

      const rowKeys = Object.keys(rows).map(Number).sort((a, b) => a - b);
      rowKeys.forEach((rowKey) => {
        const row = rows[rowKey];
        const colKeys = Object.keys(row).map(Number).sort((a, b) => a - b);
        const rowData: string[] = colKeys.map((colKey) => row[colKey]);
        data.push(rowData);
      });
    }
    this.createExcel2(data)
  }

  createExcel2(data: string[][]) {
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'output.xlsx');
  }
}

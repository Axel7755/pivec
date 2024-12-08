import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { SubirArchivosComponent } from '../subir-archivos/subir-archivos.component';

@Component({
  selector: 'app-general-a',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule],
  templateUrl: './general-a.component.html',
  styleUrl: './general-a.component.css',
  host: { 'ngSkipHydration': '' }
})
export class GeneralAComponent {

  idgrupos: string | null = null;
  g_idmaterias: string | null = null;

  archivosSubidos: File[] = [];

  @ViewChild('listContainer') listContainer!: ElementRef<HTMLUListElement>;
  readonly dialog = inject(MatDialog);


  showFileList = false;
  uploadedFiles = [
    { name: 'document.pdf', size: '500 KB' },
    { name: 'CURP.docx', size: '300 KB' },
    { name: 'presentación.zip', size: '1 MB' },
    { name: 'imagen.png', size: '200 KB' },
    { name: 'presenación 1.ppt', size: '650 KB' },
    // Añade más archivos si es necesario
  ];

  nuevoMensaje = '';

  // En tu archivo TypeScript
  getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop();
    switch (extension) {
      case 'pdf':
        return 'fas fa-file-pdf text-danger'; // icono de PDF en rojo
      case 'doc':
      case 'docx':
        return 'fas fa-file-word text-primary'; // icono de Word en azul
      case 'xls':
      case 'xlsx':
        return 'fas fa-file-excel text-success'; // icono de Excel en verde
      case 'ppt':
      case 'pptx':
        return 'fas fa-file-powerpoint text-warning'; // icono de PowerPoint en naranja
      case 'zip':
      case 'rar':
        return 'fas fa-file-archive text-muted'; // icono de archivo comprimido en gris
      default:
        return 'fas fa-file text-secondary'; // icono genérico
    }
  }

  onDownloadClick(event: Event): void {
    event.preventDefault(); // Evita cualquier acción predeterminada del enlace
    this.showFileList = !this.showFileList; // Alterna la visibilidad de la lista de archivos
  }


  // Programación en el clic para subir documentos
  openDialog() {
    const dialogRef = this.dialog.open(SubirArchivosComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.archivosSubidos = result;  // Almacena los archivos recibidos
        console.log("Archivos subidos:", this.archivosSubidos);
        this.archivosSubidos.forEach(file => {

          this.uploadFile(file);
        });
      }
    });
  }

  uploadFile(file: File): void {
    const icon = this.iconSelector(file.type);

    const li = document.createElement('li');
    li.classList.add('list-section', 'in-prog');
    li.style.display = 'flex';
    li.style.margin = '15px 0';
    li.style.paddingTop = '4px';
    li.style.paddingBottom = '2px';
    li.style.borderRadius = '8px';
    li.style.transitionDuration = '0.3s';

    li.innerHTML = `
    <div class="col" style="flex: .15; text-align: center;">
      <img src="${icon}" alt="file-icon" width="40" height="50"> <!-- Tamaño fijo -->
    </div>
    <div class="col" style="flex: .78; text-align: left; font-size: 0.9rem; color: #3e4046; padding: 8px 10px;">
      <div class="file-name">
        <div class="name" style="font-size: 15px; color: blue; font-weight: bold;">${file.name}</div>
        <span class="progress-text" style="color: #707EA0; float: right; margin-top: -16px;">0%</span> <!-- Inicialmente 0% -->
      </div>
      <div class="file-progress" style="width: 100%; height: 5px; margin-top: 8px; border-radius: 8px; background-color: #dee6fd;">
        <span class="progress-bar" style="
          display: block;
          width: 0%;
          height: 100%;
          border-radius: 8px;
          background-image: linear-gradient(120deg, #6b99fd, #9385ff);
          transition: width 0.4s ease;
        "></span>
      </div>
      <div class="file-size" style="margin-top: 5px; font-size: 0.75rem; color: #707EA0;">${(file.size / (1024 * 1024)).toFixed(2)} MB</div>
    </div>
    <div class="col" style="flex: .1;">
      <svg xmlns="http://www.w3.org/2000/svg" class="cross" height="20" width="20" style="fill: #8694d2; background-color: #dee6fd; position: relative; left: 50%; top: 40%; transform: translate(-50%, -50%); border-radius: 50%;">
        <path d="m5.979 14.917-.854-.896 4-4.021-4-4.062.854-.896 4.042 4.062 4-4.062.854.896-4 4.062 4 4.021-.854.896-4-4.063Z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" class="tick" height="20" width="20" style="fill: #50a156; background-color: transparent; position: relative; left: 50%; top: 40%; transform: translate(-50%, -50%); border-radius: 50%;">
        <path d="m8.229 14.438-3.896-3.917 1.438-1.438 2.458 2.459 6-6L15.667 7Z"/>
      </svg>
    </div>
    `;

    this.listContainer.nativeElement.prepend(li);

    const crossIcon = li.querySelector('.cross') as HTMLElement;
    const progressBar = li.querySelector('.progress-bar') as HTMLElement;
    const progressText = li.querySelector('.progress-text') as HTMLElement;

    // Simular el progreso de carga (cambiar esto si tienes una lógica de progreso real)
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10; // Aumenta de 10 en 10
        progressBar.style.width = `${progress}%`;
        progressText.innerText = `${progress}%`;
      } else {
        clearInterval(interval);
        progressBar.style.width = '100%';
        progressText.innerText = '100%';
        li.classList.remove('in-prog');
      }
    }, 250); // Aumentar el progreso cada 300 ms

    if (crossIcon) {
      crossIcon.onclick = () => {
        li.remove();
        this.archivosSubidos = this.archivosSubidos.filter(f => f.name !== file.name);
      };
    }
  }

  iconSelector(fileType: string): string {
    switch (fileType) {
      case 'image/png':
      case 'image/jpeg':
        return '../../assets/icons/image1.png';
      case 'application/pdf':
        return '../../assets/icons/pdf.png';
      case 'video/mp4':
        return '../../assets/icons/video.png';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': // .docx
      case 'application/msword': // .doc
        return '../../assets/icons/word.ico'; // Ícono para documentos de Word
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': // .xlsx
      case 'application/vnd.ms-excel': // .xls
        return '../../assets/icons/excel.ico'; // Ícono para hojas de cálculo de Excel
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation': // .pptx
      case 'application/vnd.ms-powerpoint': // .ppt
        return '../../assets/icons/ppt.ico'; // Ícono para presentaciones de PowerPoint
      case 'application/zip': // .zip
      case 'application/x-rar-compressed': // .rar
        return '../../assets/icons/zip.ico'; // Ícono para archivos comprimidos
      default:
        return '../../assets/icons/default.png'; // Ícono por defecto
    }
  }


}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-general-a',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-a.component.html',
  styleUrl: './general-a.component.css',
  host: { 'ngSkipHydration': '' }
})
export class GeneralAComponent {

  showFileList = false;
  uploadedFiles = [
    { name: 'document.pdf', size: '500 KB' },
    { name: 'CURP.docx', size: '300 KB' },
    { name: 'presentación.zip', size: '1 MB' },
    { name: 'imagen.png', size: '200 KB' },
    { name: 'presenación 1.ppt', size: '650 KB' },
    // Añade más archivos si es necesario
  ];

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


}

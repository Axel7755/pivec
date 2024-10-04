import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SubirArchivosService } from './subir-archivos.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-tareas-d',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crear-tareas-d.component.html',
  styleUrl: './crear-tareas-d.component.css',
  host: { 'ngSkipHydration': '' }

})
export class CrearTareasDComponent implements OnInit {

  @ViewChild('fileSelectorInput') fileSelectorInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropArea') dropArea!: ElementRef<HTMLDivElement>;
  @ViewChild('listContainer') listContainer!: ElementRef<HTMLUListElement>;
  archivosSubidos: File[] = []; // Array para almacenar los archivos subidos


  message = '';
  currentFile?: File;
  fileInfos?: Observable<any>;

  constructor(private subirArchivosService: SubirArchivosService) { }

  ngOnInit(): void {
    // Carga la lista de archivos subidos al inicializar el componente
    this.fileInfos = this.subirArchivosService.getFiles();
  }

  // Método para abrir el selector de archivos
  onFileSelectorClick(): void {
    this.fileSelectorInput.nativeElement.click();
  }

  // Método para manejar el cambio en la selección de archivos
  onFileChange(): void {
    const files = this.fileSelectorInput.nativeElement.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (this.typeValidation(file.type)) {
          this.uploadFile(file);
          this.logFileDetails(file); // Loguear los detalles del archivo
          console.log('Archivo subido:', file); // Añade este log para verificar
        } else {
          console.error('Tipo de archivo no permitido:', file.type);
        }
      });
    }
  }

  // Método para validar el tipo de archivo
  typeValidation(fileType: string): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf', 'video/mp4'];
    return allowedTypes.includes(fileType);
  }

  // Método para agregar el archivo a la lista
  agregarArchivo(file: File) {
    this.archivosSubidos.push(file);
    console.log('Archivos subidos actuales:', this.archivosSubidos);
  }

  // Método para manejar la subida de archivos
  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement; // Asegúrate de que sea del tipo correcto
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        this.agregarArchivo(file); // Llama a agregarArchivo para cada archivo
      }
    }
  }

  // Método para subir el archivo usando el servicio
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
        <img src="${icon}" alt="file-icon">
      </div>
      <div class="col" style="flex: .78; text-align: left; font-size: 0.9rem; color: #3e4046; padding: 8px 10px;">
        <div class="file-name">
          <div class="name" style="font-size: 15px; color: #FF0000; font-weight: bold;">${file.name}</div>
          <span style="color: #707EA0; float: right; margin-top: -16px;">100%</span> 
        </div>
        <div class="file-progress" style="width: 100%; height: 5px; margin-top: 8px; border-radius: 8px; background-color: #dee6fd;">
          <span style="display: block; width: 100%; height: 100%; border-radius: 8px; background-image: linear-gradient(120deg, #6b99fd, #9385ff); transition-duration: 0.4s;"></span> <!-- Muestra 100% de inicio -->
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

    this.subirArchivosService.upload(file).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);

          // Actualizar el progreso en el span correspondiente
          const progressSpan = li.querySelector('.file-progress span') as HTMLElement;
          const percentSpan = li.querySelector('.file-name span') as HTMLElement;

          if (progressSpan && percentSpan) {
            percentSpan.innerHTML = `100%`; // Muestra 100% en el texto
            progressSpan.style.width = `100%`; // Mantiene la barra al 100%
          }
        } else if (event instanceof HttpResponse) {
          li.classList.add('complete');
          li.classList.remove('in-prog');
        }
      },
      error: (err: any) => {
        console.error('Error al subir el archivo', err);
        li.remove();
      }
    });

    const crossIcon = li.querySelector('.cross') as HTMLElement;
    if (crossIcon) {
      crossIcon.onclick = () => {
        // Lógica para abortar la subida
        li.remove();
      };
    }
  }


  // Método para obtener el ícono según el tipo de archivo
  iconSelector(fileType: string): string {
    switch (fileType) {
      case 'image/png':
      case 'image/jpeg':
        return '../../assets/icons/image1.png';
      case 'application/pdf':
        return '../../assets/icons/pdf.png';
      case 'video/mp4':
        return '../../assets/icons/video.png';
      default:
        return '../../assets/icons/image1.png';
    }
  }

  // Método para logear detalles del archivo
  logFileDetails(file: File): void {
    const currentDate = new Date(); // Captura la fecha y hora actual

    // Configuración de opciones para la fecha y hora en la zona horaria de México
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Mexico_City', // Establecer la zona horaria a la de Ciudad de México
    };

    // Formateo de la fecha actual en la zona horaria de México
    const formattedUploadDate = currentDate.toLocaleString('es-MX', options);

    // Mostrar los detalles del archivo en la consola
    console.log({
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: formattedUploadDate // Fecha y hora de subida
    });
  }

  // Método para manejar el evento cuando el archivo es arrastrado sobre el área
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const items = event.dataTransfer?.items;
    if (items) {
      Array.from(items).forEach(item => {
        if (this.typeValidation(item.type)) {
          this.dropArea.nativeElement.classList.add('drag-over-effect');
        }
      });
    }
  }

  // Método para manejar cuando el archivo deja el área de drop
  onDragLeave(): void {
    this.dropArea.nativeElement.classList.remove('drag-over-effect');
  }

  // Método para manejar cuando el archivo es soltado en el área de drop
  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dropArea.nativeElement.classList.remove('drag-over-effect');
    const files = event.dataTransfer?.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (this.typeValidation(file.type)) {
          this.uploadFile(file);
          this.logFileDetails(file); // Loguear los detalles del archivo
        } else {
          console.error('Tipo de archivo no permitido:', file.type);
        }
      });
    }
  }

  removeFile(file: File): void {
    this.archivosSubidos = this.archivosSubidos.filter(f => f !== file);
  }
}
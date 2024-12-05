import { Component, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UploadVideosComponent } from '../upload-videos/upload-videos.component';

@Component({
  selector: 'app-clases-grabadas',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './clases-grabadas.component.html',
  styleUrl: './clases-grabadas.component.css'
})
export class ClasesGrabadasComponent {

  truncatedContent = '';

  // Lista de tarjetas de video
  videoCards = [
    { title: 'Liderazgo Personal', subtitle: 'Luis Francisco', isVideoVisible: false, videoSrc: '../../assets/images/Cancion2.mp4' },
    { title: 'Programación', subtitle: 'Alan Ricardo', isVideoVisible: false, videoSrc: '' }
  ];

  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChild('listContainer') listContainer!: ElementRef<HTMLUListElement>;

  constructor(private dialog: MatDialog) { }

  archivosSubidos: File[] = [];

  // Método para mostrar y reproducir el video
  playVideo(index: number) {
    // Detener y ocultar cualquier video visible
    this.videoCards.forEach((card, i) => {
      card.isVideoVisible = false; // Ocultar todos los videos
      const videoPlayer = this.videoPlayers.get(i);
      if (videoPlayer) {
        videoPlayer.nativeElement.pause(); // Pausar el video si está en reproducción
        videoPlayer.nativeElement.currentTime = 0; // Reiniciar el video
      }
    });

    // Mostrar el video correspondiente
    this.videoCards[index].isVideoVisible = true;
    const videoPlayer = this.videoPlayers.get(index);
    if (videoPlayer) {
      videoPlayer.nativeElement.play(); // Reproducir el video
    }
  }

  // Método para manejar la acción del botón de subir video
  openDialog() {
    const dialogRef = this.dialog.open(UploadVideosComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El resultado ahora incluirá tanto los archivos subidos como el título y la materia seleccionada
        const { title, subject } = result;

        this.archivosSubidos.forEach(file => {
          this.uploadFile(file, title, subject);  // Ahora pasamos los nuevos datos al método de carga
        });
      }
    });
  }


  uploadFile(file: File, title: string, subject: string): void {
    const icon = this.iconSelector(file.type);

    // Crear el contenedor <li> para el archivo
    const li = document.createElement('li');
    li.classList.add('list-section', 'in-prog');
    li.style.display = 'flex';
    li.style.margin = '15px 0';
    li.style.paddingTop = '4px';
    li.style.paddingBottom = '2px';
    li.style.borderRadius = '8px';
    li.style.transitionDuration = '0.3s';
    li.style.flexDirection = 'column';  // Apilar los elementos verticalmente

    // Agregar HTML del archivo
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
          <span class="progress-bar" style="display: block; width: 0%; height: 100%; border-radius: 8px; background-image: linear-gradient(120deg, #6b99fd, #9385ff); transition: width 0.4s ease;"></span>
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

    // Agregar el contenedor <li> al contenedor principal
    this.listContainer.nativeElement.prepend(li);

    // Agregar campos para el título y selección de materia
    const titleDiv = document.createElement('div');
    titleDiv.style.marginTop = '10px';
    titleDiv.innerHTML = `
      <label for="video-title" style="font-size: 0.85rem; color: #3e4046; display: block;">Titulo del Video</label>
      <input id="video-title" type="text" value="${title}" disabled style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
    `;

    const subjectDiv = document.createElement('div');
    subjectDiv.style.marginTop = '10px';
    subjectDiv.innerHTML = `
      <label for="video-subject" style="font-size: 0.85rem; color: #3e4046; display: block;">Selecciona una Materia</label>
      <input id="video-subject" type="text" value="${subject}" disabled style="width: 100%; padding: 6px; border: 1px solid #ccc; border-radius: 4px;">
    `;

    // Insertar los campos debajo del archivo en el contenedor <li>
    li.appendChild(titleDiv);
    li.appendChild(subjectDiv);

    // Lógica para progreso de carga
    const crossIcon = li.querySelector('.cross') as HTMLElement;
    const progressBar = li.querySelector('.progress-bar') as HTMLElement;
    const progressText = li.querySelector('.progress-text') as HTMLElement;

    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        progressText.innerText = `${progress}%`;
      } else {
        clearInterval(interval);
        progressBar.style.width = '100%';
        progressText.innerText = '100%';
        li.classList.remove('in-prog');
      }
    }, 250);

    if (crossIcon) {
      crossIcon.onclick = () => {
        li.remove();
        this.archivosSubidos = this.archivosSubidos.filter(f => f.name !== file.name);
      };
    }
  }

  // Método para seleccionar el ícono dependiendo del tipo de archivo
  iconSelector(fileType: string): string {
    let iconPath = '';
    if (fileType.includes('video')) {
      iconPath = '../../assets/icons/video-icon.png';
    } else {
      iconPath = '../../assets/icons/file-icon.png';
    }
    return iconPath;
  }

}

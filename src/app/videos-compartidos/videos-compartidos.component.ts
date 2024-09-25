import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-videos-compartidos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './videos-compartidos.component.html',
  styleUrls: ['./videos-compartidos.component.css'],
  host: { 'ngSkipHydration': '' }
})
export class VideosCompartidosComponent {
  // Contenido truncado que se mostrará en todas las tarjetas
  truncatedContent = 'Aquí va el contenido recortado o el texto que desees mostrar';

  // Lista de tarjetas de video con su visibilidad correspondiente
  videoCards = [
    { title: 'Liderazgo Personal', subtitle: 'Luis Francisco', isVideoVisible: false, videoSrc: '../../assets/images/Cancion1.mp4' },
    { title: 'Programación', subtitle: 'Alan Ricardo', isVideoVisible: false, videoSrc: '#' },
    { title: 'Matematicas', subtitle: 'Ricardo', isVideoVisible: false, videoSrc: '#' },
    { title: 'Musica', subtitle: 'Maria', isVideoVisible: false, videoSrc: '#' },
    { title: 'Español', subtitle: 'Juanito', isVideoVisible: false, videoSrc: '../../assets/images/Cancion2.mp4' },

    // Asegúrate de que estos archivos existan en el directorio especificado
];

  // ViewChildren para obtener una lista de referencias a todos los elementos <video> en el DOM
  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;

  // Método para reproducir el video en el mat-card específico
  playVideo(index: number) {
    // Detener y ocultar cualquier video que esté reproduciéndose
    this.videoCards.forEach((card, i) => {
      card.isVideoVisible = false; // Ocultar todos los videos
      const videoPlayer = this.videoPlayers.get(i);
      if (videoPlayer) {
        videoPlayer.nativeElement.pause(); // Pausar el video si está en reproducción
        videoPlayer.nativeElement.currentTime = 0; // Reiniciar el video
      }
    });

    // Mostrar y reproducir el video en el mat-card específico
    this.videoCards[index].isVideoVisible = true;
    const videoPlayer = this.videoPlayers.get(index);
    if (videoPlayer) {
      videoPlayer.nativeElement.play(); // Reproducir el video
    }
  }
}

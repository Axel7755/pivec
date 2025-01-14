import { Component, ViewChildren, QueryList, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { SubirArchivosService } from '../subir-archivos/subir-archivos.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, forkJoin } from 'rxjs';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-clases-grabadas',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './clases-grabadas.component.html',
  styleUrl: './clases-grabadas.component.css'
})
export class ClasesGrabadasComponent implements OnInit {

  truncatedContent = '';
  idgrupos: string | null = null;
  g_idmaterias: string | null = null;
  BACKEND_BASE_URL = `${environment.apiUrl}:8080`;

  // Lista de tarjetas de video
  videoCards: any = [  ];

  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChild('listContainer') listContainer!: ElementRef<HTMLUListElement>;

  constructor(private subirArchivosService: SubirArchivosService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];
    });
    this.subirArchivosService.getFilesGrabaciones(this.idgrupos!, this.g_idmaterias!).pipe(
      catchError(this.handleError )
    ).subscribe(grabacionesData => {
      if (grabacionesData && Array.isArray(grabacionesData.files)) {
        console.log('Archivos obtenidos:', grabacionesData.files);

        grabacionesData.files.forEach((file: any) => {
          console.log('Archivo:', file); // Esto imprimirá cada archivo
          console.log('Nombre del archivo:', file.name);
          const fileURL = `${this.BACKEND_BASE_URL}/uploads/grabacionesF/${this.g_idmaterias}/${this.idgrupos}/${file.name}`;
          this.videoCards.push({
            title: file.name,
            subtitle: '',
            isVideoVisible: false,
            videoSrc: fileURL,
          });
        });
       console.log("Clases grabadas",this.videoCards)
      } else {
        console.log("sin archivos");
      }
    })
  }

  archivosSubidos: File[] = [];

  // Método para mostrar y reproducir el video
  playVideo(index: number) {
    // Detener y ocultar cualquier video visible
    this.videoCards.forEach((card:any, i:any) => {
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

  private handleError(error: any) {
    console.error('Error:', error);
    //alert('Ocurrió un error. Por favor, inténtelo de nuevo.');
    return of(null);
  }

}

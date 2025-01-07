import { Component, ViewChildren, QueryList, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UploadVideosComponent } from '../upload-videos/upload-videos.component';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { environment } from '../../environments/environments';
import { forkJoin, of, mergeMap, catchError, Observable, tap } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { GruposService } from '../servicios/grupos.service';
import { GruposAlumnosService } from '../servicios/grupos-alumnos.service';
import { MateriasService } from '../servicios/materias.service';
import { DocentesService } from '../servicios/docentes.service';
import { VideosService } from '../servicios/videos.service';

@Component({
  selector: 'app-videos-compartidos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, CommonModule, FormsModule],
  templateUrl: './videos-compartidos.component.html',
  styleUrls: ['./videos-compartidos.component.css'],
  host: { 'ngSkipHydration': '' }
})
export class VideosCompartidosComponent implements OnInit {
  truncatedContent = 'Aquí va el contenido recortado o el texto que desees mostrar';
  showCheckboxes = false;
  isButtonClicked = false; // Esta propiedad controlará si el botón ha sido presionado
  googleScholarUrl: SafeResourceUrl = '';
  BACKEND_BASE_URL = `${environment.apiUrl}:8080`;

  isDocente: boolean = false;
  userId: string | null = null;
  grupos: any[] = [];
  docentes: any[] = [];
  materias: any[] = [];
  combinados: any[] = [];

  // Lista de tarjetas de video
  videoCards: any = [ ];

  @ViewChildren('videoPlayer') videoPlayers!: QueryList<ElementRef<HTMLVideoElement>>;
  @ViewChild('listContainer') listContainer!: ElementRef<HTMLUListElement>;

  constructor(private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private gruposService: GruposService,
    private grupoAlumnosService: GruposAlumnosService,
    private materiasService: MateriasService,
    private docentesService: DocentesService,
    private videosService: VideosService,

  ) { }

  ngOnInit(): void {
    this.isDocente = this.authService.getUserRole() === 'docente';
    this.userId = this.authService.getUserId();
    if (this.isDocente) {
      console.log("docente")
      this.gruposService.getGruposByDocente(this.userId!).pipe(
        catchError(error => {
          console.error('Error al recuperar grupos', error);
          alert('Error al recuperar grupos');
          return of([]);
        })
      )
        .subscribe(gruposData => {
          this.grupos = gruposData;
          const materiasObservables = this.grupos.map(grupob =>
            this.materiasService
              .findMateriaById(grupob.g_idmaterias)
              .pipe(
                catchError(error => {
                  console.error('Error al recuperar materias', error);
                  alert('Error al recuperar materias');
                  return of(null);
                })
              )
          );
          forkJoin(materiasObservables).subscribe(materiasData => {
            this.materias = materiasData.filter(materia => materia !== null);
            if (this.materias.length > 0) {
              this.combinados = this.grupos.map(obj1 => {
                const matchingObj2 = this.materias.find(
                  obj2 => obj2.idmaterias === obj1.g_idmaterias
                );
                return matchingObj2
                  ? { ...obj1, material: matchingObj2.material }
                  : obj1;
              });
              this.getVideoRecords();
              //console.log(this.combinados);
            }
          });
        });
    } else {
      this.grupoAlumnosService.findGruposAlumno(this.userId!).pipe(
        catchError(error => {
          console.error('Error al recuperar grupos', error);
          alert('Error al recuperar grupos');
          return of([]);
        }),
        mergeMap(gruposAlumnData => {
          if (gruposAlumnData.length === 0) {
            return of([]); // No hay grupos, devolver un array vacío
          }

          // Obtener los detalles de cada grupo
          return forkJoin(gruposAlumnData.map((grupoAl: any) => {
            return this.gruposService.getGruposByID(grupoAl.ga_idmaterias, grupoAl.ga_idgrupos).pipe(
              catchError(error => {
                console.error('Error al recuperar grupos', error);
                alert('Error al recuperar grupos');
                return of(null); // Devolver null en caso de error
              })
            );
          })) as Observable<any[]>; // Tipar correctamente el retorno de forkJoin
        }),
        mergeMap((gruposDataArray: any[]) => {
          const gruposFiltrados = gruposDataArray.filter(grupoData => grupoData !== null);
          this.grupos.push(...gruposFiltrados);
          console.log(this.grupos);

          if (this.grupos.length === 0) {
            return of([]); // No hay grupos, devolver un array vacío
          }

          // Obtener los detalles de cada docente
          return forkJoin(this.grupos.map(grupo => {
            return this.docentesService.obtenerDocente(grupo.g_doc_noTrabajador).pipe(
              catchError(error => {
                console.error('Error al recuperar docente', error);
                alert('Error al recuperar docente');
                return of(null); // Devolver null en caso de error
              })
            );
          })) as Observable<any[]>; // Tipar correctamente el retorno de forkJoin
        })
      ).subscribe((docenteDataArray: any[]) => {
        const docentesFiltrados = docenteDataArray.filter(docenteData => docenteData !== null);
        this.docentes.push(...docentesFiltrados);
        console.log(this.docentes);

        const materiasObservables = this.grupos.map(grupo =>
          this.materiasService.findMateriaById(grupo.g_idmaterias).pipe(
            catchError(error => {
              console.error('Error al recuperar materias', error);
              alert('Error al recuperar materias');
              return of(null);
            })
          )
        );

        forkJoin(materiasObservables).subscribe(materiasData => {
          this.materias = materiasData.filter(materia => materia !== null);

          if (this.materias.length > 0) {
            // Combinación final de grupos, materias y docentes
            this.combinados = this.grupos.map(grupo => {
              const matchingMateria = this.materias.find(materia => materia.idmaterias === grupo.g_idmaterias);
              const matchingDocente = this.docentes.find(docente => docente.noTrabajador === grupo.g_doc_noTrabajador);

              return {
                ...grupo,
                material: matchingMateria ? matchingMateria.material : null,
                docente: matchingDocente
                  ? `${matchingDocente.apellidoP_Do} ${matchingDocente.apellidoM_Do} ${matchingDocente.nombres_Do}`.trim()
                  : null // Asegúrate de ajustar las propiedades según los datos de tu docente
              };
            });
            this.getVideoRecords();
            console.log("combinados",this.combinados);
          }
        });
      });

    }
  }

  getVideoRecords() {
    const videoRecords: any = [];
    const videoObservables = this.combinados.map(combinado => this.videosService.getVideosByMateria(combinado.g_idmaterias).pipe(
      catchError(error => {
        console.error('Error al recuperar materias', error);
        //alert('Error al recuperar videos'); 
        return of([]);
      })));
    forkJoin(videoObservables).subscribe(videosDataMaterias => {
      videosDataMaterias.forEach((videosData, index) => {
        if (videosData.length > 0) {
          videosData.forEach((videoData:any) => {
            if (videoData.dirección_V.includes("http")) {
              this.videoCards.push({
                v_idmaterias: videoData.v_idmaterias,
                v_boleta: videoData.v_boleta,
                idvideos: videoData.idvideos,
                title: videoData.titulo_V,
                subtitle: this.combinados[index].material,
                isVideoVisible: false,
                videoSrc: videoData.dirección_V,
                seleccionada: false,
                isYouTube: true,
                usuario: videoData.v_boleta
              });
            } else {
              const fileURL = `${this.BACKEND_BASE_URL}/uploads/videosF/${videoData.dirección_V}`;
              this.videoCards.push({
                v_idmaterias: videoData.v_idmaterias,
                v_boleta: videoData.v_boleta,
                idvideos: videoData.idvideos,
                title: videoData.titulo_V,
                subtitle: this.combinados[index].material,
                isVideoVisible: false,
                videoSrc: fileURL,
                seleccionada: false,
                isYouTube: false,
                usuario: videoData.v_boleta
              });
            }
            
          });
          //videoRecords.push({ materia: this.combinados[index].g_idmaterias, videos: videos });
        }
      });
      console.log(videoRecords); // You can use the videoRecords array as needed 
    });
  }

  archivosSubidos: File[] = [];

  // Método para mostrar y reproducir el video
  playVideo(index: number) {
    // Detener y ocultar cualquier video visible
    this.videoCards.forEach((card: any, i: any) => {
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

  getVideoIframe(url: string) {
    var video, results;

    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = (results === null) ? url : results[1];

    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);
  }

  // Método para manejar la acción del botón de subir video
  openDialog() {
    const dialogRef = this.dialog.open(UploadVideosComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // El resultado ahora incluirá tanto los archivos subidos como el título y la materia seleccionada
        const videoData = result;

        if (videoData.dirección_V.includes("http")) {
          this.videoCards.push({
            v_idmaterias: videoData.v_idmaterias,
            v_boleta: videoData.v_boleta,
            idvideos: videoData.idvideos,
            title: videoData.titulo_V,
            subtitle: videoData.materia_V,
            isVideoVisible: false,
            videoSrc: videoData.dirección_V,
            seleccionada: false,
            isYouTube: true,
            usuario: videoData.v_boleta
          });
        } else {
          const fileURL = `${this.BACKEND_BASE_URL}/uploads/videosF/${videoData.dirección_V}`;
          this.videoCards.push({
            v_idmaterias: videoData.v_idmaterias,
            v_boleta: videoData.v_boleta,
            idvideos: videoData.idvideos,
            title: videoData.titulo_V,
            subtitle: videoData.materia_V,
            isVideoVisible: false,
            videoSrc: fileURL,
            seleccionada: false,
            isYouTube: false,
            usuario: videoData.v_boleta
          });
        }
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

  // Programación para seleccionar videos y eliminarlos

  toggleCheckboxes() {
    this.isButtonClicked = !this.isButtonClicked;  // Cambiar el estado al hacer clic
    if (!this.hayTareasSeleccionadas()) {
      this.showCheckboxes = !this.showCheckboxes;
    }
  }

  hayTareasSeleccionadas(): boolean {
    return this.videoCards.some((video: any) => video.seleccionada);
  }

  eliminarEntregas() {

    const selecionados = this.videoCards.filter((video: any) => video.seleccionada);
    //this.videoCards = this.videoCards.filter((video: any) => !video.seleccionada);
    selecionados.forEach((videoDel: any) => {

      this.videosService.deleteVideo(videoDel.v_idmaterias, this.userId!, videoDel.idvideos).pipe(
        catchError(this.handleError)
      ).subscribe(videoData => {
        if(videoData){
          this.videoCards = this.videoCards.filter((video: any) => !video.seleccionada);
        }
      })
    });
    
  }

  private handleError(error: any) {
    console.error('Error:', error);
    //alert('Ocurrió un error. Por favor, inténtelo de nuevo.');
    return of(null);
  }

}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { forkJoin, of, mergeMap, catchError, Observable, tap } from 'rxjs'; // Correcto: importando de 'rxjs/operators'
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MateriasService } from '../servicios/materias.service';
import { AuthService } from '../servicios/auth.service';
import { GruposService } from '../servicios/grupos.service';
import { GruposAlumnosService } from '../servicios/grupos-alumnos.service';
import { DocentesService } from '../servicios/docentes.service';
import { SubirArchivosService } from '../subir-archivos/subir-archivos.service';
import { VideosService } from '../servicios/videos.service';

@Component({
  selector: 'app-upload-videos',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './upload-videos.component.html',
  styleUrl: './upload-videos.component.css',
  host: { 'ngSkipHydration': '' }
})
export class UploadVideosComponent implements OnInit {

  videoTitle: string = '';  // Almacena el título del video
  linkYoutube: string = '';
  videoSubject: string = '';  // Almacena la materia seleccionada
  isDropSectionDisabled: boolean = false;
  isYoutubeSectionDisabled: boolean = false;

  isDocente: boolean = false;
  userId: string | null = null;
  grupos: any[] = [];
  docentes: any[] = [];
  materias: any[] = [];
  combinados: any[] = [];

  @ViewChild('fileSelectorInput') fileSelectorInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropArea') dropArea!: ElementRef<HTMLDivElement>;
  @ViewChild('listContainer') listContainer!: ElementRef<HTMLUListElement>;
  archivosSubidos: File[] = []; // Array para almacenar los archivos subidos

  message = '';
  currentFile?: File;
  fileInfos?: Observable<any>;

  constructor(private subirArchivosService: SubirArchivosService,
    private authService: AuthService,
    private gruposService: GruposService,
    private grupoAlumnosService: GruposAlumnosService,
    private materiasService: MateriasService,
    private docentesService: DocentesService,
    private videosService: VideosService,
    public dialogRef: MatDialogRef<UploadVideosComponent>) { }

  // Método para manejar la acción de guardar los datos cuando se cierra el diálogo
  getFormData() {
    return {
      title: this.videoTitle,
      subject: this.videoSubject
    };
  }

  ngOnInit(): void {
    // Carga la lista de archivos subidos al inicializar el componente
    //this.fileInfos = this.subirArchivosService.getFiles();
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

            console.log(this.combinados);
          }
        });
      });

    }
  }

  onLinkYoutubeChange(): void {
    this.isDropSectionDisabled = this.linkYoutube.trim().length > 0;
  }

  // Método para abrir el selector de archivos
  onFileSelectorClick(): void {
    this.fileSelectorInput.nativeElement.click();
  }

  // Método para manejar el cambio en la selección de archivos
  onFileChange(): void {
    const files = this.fileSelectorInput.nativeElement.files;

    if (files) {
      // No resetees el array, solo agrega los archivos seleccionados
      Array.from(files).forEach(file => {
        if (this.typeValidation(file.type)) {
          this.uploadFile(file); // Mantén la función de subida
          this.agregarArchivo(file); // Agrega el archivo al array de archivos subidos
          this.logFileDetails(file); // Loguear los detalles del archivo
          console.log('Archivo subido:', file); // Log para verificar
        } else {
          console.error('Tipo de archivo no permitido:', file.type);
          alert('Por favor, selecciona únicamente archivos de video.');
        }
      });

      // Resetea el input para permitir seleccionar los mismos archivos más de una vez si es necesario
      this.fileSelectorInput.nativeElement.value = '';
    }
  }

  // Método para validar el tipo de archivo
  typeValidation(fileType: string): boolean {
    const allowedTypes = [
      'video/mp4',  // .mp4
      'video/x-ms-wmv',  // .wmv
      'video/mpeg',  // .mpeg
      'video/ogg'  // .ogv
    ];
    return allowedTypes.includes(fileType);
  }

  // Método para agregar el archivo a la lista
  agregarArchivo(file: File) {
    this.archivosSubidos.push(file);
    console.log('Video subido actualmente:', this.archivosSubidos);
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

  // Método para manejar la selección de archivos
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      for (let i = 0; i < input.files.length; i++) {
        const file = input.files[i];
        this.archivosSubidos.push(file); // Agrega el archivo a la lista
        this.uploadFile(file); // Muestra el archivo en la interfaz
      }
    }
  }

  // Método para mostrar el archivo en la interfaz
  uploadFile(file: File): void {
    this.isYoutubeSectionDisabled = true;
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

        this.isYoutubeSectionDisabled = false;
        this.archivosSubidos = this.archivosSubidos.filter(f => f.name !== file.name);
      };
    }
  }

  // Método para subir archivos solo cuando se hace clic en el botón
  uploadFiles(): void {
    //this.dialogRef.close(this.archivosSubidos);
    if (this.isDropSectionDisabled) {
      //console.log("ES DE YOUTUBE con materia", this.videoSubject)

      const video = {
        titulo_V: this.videoTitle,
        dirección_V: this.linkYoutube,
        v_boleta: this.userId,
        v_idmaterias: this.videoSubject
      }

      this.videosService.createVideo(video).pipe(
        catchError(this.handleError)
      ).subscribe(videoData => {
        if (videoData) {
          this.dialogRef.close(videoData);
        }
      })
    } else {
      //console.log("NO ES DE YOUTUBE")
      

      if (this.archivosSubidos.length === 0) {
        console.warn('No hay archivos para subir.');
        return;
      }

      const uploadObservables = this.archivosSubidos.map(file => {
        const listItems = this.listContainer.nativeElement.querySelectorAll('li');
        let li: HTMLElement | null = null;

        listItems.forEach((item: HTMLElement) => {
          const nameElement = item.querySelector('.file-name .name');
          if (nameElement && nameElement.textContent === file.name) {
            li = item;
          }
        });

        if (!li) {
          console.error(`Elemento <li> no encontrado para el archivo: ${file.name}`);
          return null; // Devuelve null si no se encuentra el elemento
        }

        return this.subirArchivosService.uploadVideo(file, this.videoSubject ).pipe(
          // Manejar el progreso de carga
          tap((event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              const percentDone = Math.round(100 * event.loaded / event.total);
              const progressSpan = li?.querySelector('.file-progress span') as HTMLElement | null;
              const percentSpan = li?.querySelector('.file-name span') as HTMLElement | null;

              if (progressSpan && percentSpan) {
                percentSpan.innerHTML = `${percentDone}%`;
                progressSpan.style.width = `${Math.min(Math.max(percentDone, 0), 100)}%`;
              }
            } else if (event instanceof HttpResponse) {
              li?.classList.add('complete');
              li?.classList.remove('in-prog');
            }
          }),
          // Manejar errores
          catchError(err => {
            console.error('Error al subir el archivo', err);
            li?.remove();
            return of(null); // Devuelve un observable nulo en caso de error
          })
        );
      }).filter(obs => obs !== null); // Filtrar nulls

      // Combina todos los observables para ejecutar la subida de todos los archivos
      if (uploadObservables.length > 0) {
        forkJoin(uploadObservables).subscribe({
          next: (responses) => {
            responses.forEach((response: any) => {
              if (response && response.body) {
                const ubicacion = `${this.videoSubject}/${response.body.file.finalName}`;
                const video = {
                  titulo_V: this.videoTitle,
                  dirección_V: ubicacion,
                  v_boleta: this.userId,
                  v_idmaterias: this.videoSubject
                }

                this.videosService.createVideo(video).pipe(
                  catchError(this.handleError)
                ).subscribe(videoData => {
                  if (videoData) {
                    this.dialogRef.close(videoData);
                  }
                })
                //this.dialogRef.close(videoData);
                //console.log('Ruta completa:', response.body.file.path);
              }
            });
            console.log('Todos los archivos se han subido con éxito.');
          },
          complete: () => {
            // Limpiar la lista de archivos después de completar la subida
            this.archivosSubidos = [];
            this.fileSelectorInput.nativeElement.value = ''; // Limpiar el input de archivos
            this.listContainer.nativeElement.innerHTML = ''; // Limpiar la lista en la interfaz
          }
        });
      }
      
    }
  }

  // Método para obtener el ícono según el tipo de archivo
  iconSelector(fileType: string): string {
    switch (fileType) {
      case 'video/mp4':  // .mp4
      case 'video/x-ms-wmv':  // .wmv
      case 'video/mpeg':  // .mpeg
      case 'video/ogg':  // .ogv
        return '../../assets/icons/video.png';  // Ícono para videos
      default:
        return '../../assets/icons/default.png';  // Ícono por defecto
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

  private handleError(error: any) {
    console.error('Error:', error);
    //alert('Ocurrió un error. Por favor, inténtelo de nuevo.');
    return of(null);
  }
}
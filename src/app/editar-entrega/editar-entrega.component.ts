import { Component, inject, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SubirArchivosComponent } from '../subir-archivos/subir-archivos.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from '../servicios/tareas.service';
import { SubirArchivosService } from '../subir-archivos/subir-archivos.service';
import { AuthService } from '../servicios/auth.service';
import { DocentesService } from '../servicios/docentes.service';
import { catchError, of, forkJoin, tap } from 'rxjs';
import { GruposService } from '../servicios/grupos.service';
import { EntregasService } from '../servicios/entregas.service';
import { GoogleDriveService } from '../servicios/google-drive.service';
import { GoogleDriveFileService } from '../servicios/google-drive-file.service';
import { environment } from '../../environments/environments';
import { AlumnosService } from '../servicios/alumnos.service';
import { ComentariosService } from '../servicios/comentarios.service';

@Component({
  selector: 'app-editar-entrega',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule],
  templateUrl: './editar-entrega.component.html',
  styleUrl: './editar-entrega.component.css',
  host: { 'ngSkipHydration': '' }
})

export class EditarEntregaComponent {

  alumno: string = "";
  idgrupos: string | null = null;
  userId: string | null = null;
  docente: string | null = "";
  g_idmaterias: string | null = null;
  titulo: string = "";
  descrip: string = "";
  idtarea: string | null = null;
  archivosSubidos: File[] = [];
  archivosSubidos2: File[] = [];
  fechaVencimiento: string = '';
  BACKEND_BASE_URL = `${environment.apiUrl}:8080`;
  mensajes:any = [ ];

  @ViewChild('listContainer') listContainer!: ElementRef<HTMLUListElement>;

  @ViewChild('listContainer2') listContainer2!: ElementRef<HTMLUListElement>;
  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute,
    private tareasService: TareasService,
    private router: Router,
    private subirArchivosService: SubirArchivosService,
    private authService: AuthService,
    private alumnosService: AlumnosService,
    private googleDriveService: GoogleDriveService,
    private googleDriveFileService: GoogleDriveFileService,
    private docentesService: DocentesService,
    private gruposService: GruposService,
    private entregasService: EntregasService,
    private comentariosService: ComentariosService
  ) {

  }

  openDialog() {
    const dialogRef = this.dialog.open(SubirArchivosComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {  // Asegúrate de que `result` tenga archivos
        if (this.archivosSubidos2.length === 0) {  // Verifica si está vacío
          this.archivosSubidos2 = result;  // Almacena los archivos recibidos
        } else {
          this.archivosSubidos2.push(...result);  // Añade cada archivo individualmente
        }

        console.log("Archivos subidos:", this.archivosSubidos2);
        this.listContainer2.nativeElement.innerHTML = ''; // Limpiar la lista en la interfaz
        this.archivosSubidos2.forEach(file => {
          this.uploadFile2(file);
        });
      }
    });
  }

  

  nuevoMensaje = '';

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];
      this.userId = this.authService.getUserId();

      this.gruposService.getGruposByID(this.g_idmaterias!, this.idgrupos!).pipe(
        catchError(error => {
          console.error('Error al recuperar grupo', error);
          alert('Error al recuperar grupo');
          return of(null);
        })
      ).subscribe(grupoDaTA => {
        if (grupoDaTA) {
          this.docentesService.obtenerDocente(grupoDaTA.g_doc_noTrabajador).pipe(
            catchError(error => {
              console.error('Error al recuperar docente', error);
              alert('Error al recuperar docente');
              return of(null);
            })
          ).subscribe(docenteData => {
            if (docenteData) {
              this.docente = `${docenteData.apellidoP_Do} ${docenteData.nombres_Do} ${docenteData.apellidoM_Do}`;
              console.log('docente obtencion',this.docente)
            }
          });
        }
      });

      //this.tareasService.findTareaById
      //console.log('ID de grupo:', this.idgrupos);
      //console.log('ID de materia:', this.g_idmaterias);
    });
    this.route.params.subscribe(paramsh => {
      this.idtarea = paramsh['idtarea'];
      if (this.g_idmaterias && this.idgrupos && this.idtarea) {
        this.tareasService.findTareaById(this.g_idmaterias, this.idgrupos, this.idtarea)
          .pipe(
            catchError(error => {
              console.error('Error al recuperar tarea', error);
              alert('Error al recuperar tarea');
              return of(null);
            })
          ).subscribe(tareaData => {
            if (tareaData) {
              this.titulo = tareaData.titulo_T;
              this.descrip = tareaData.descripción_T;
              this.fechaVencimiento = new Date(tareaData.fecha_Entrega).toISOString().slice(0, 16);
            } else {
              console.error('tarea no existe');
            }
          });

        this.subirArchivosService.getFiles(this.idgrupos!, this.g_idmaterias!, this.idtarea!)
          .pipe(
            catchError(error => {
              console.error('Error al recuperar archivos', error);
              return of(null);
            })
          ).subscribe(archivosData => {
            if (archivosData && Array.isArray(archivosData.files)) {
              console.log('Archivos obtenidos:', archivosData.files);
              this.archivosSubidos = archivosData.files;
              this.archivosSubidos.forEach((file: any) => {
                console.log('Archivo:', file); // Esto imprimirá cada archivo
                console.log('Nombre del archivo:', file.name);
                this.uploadFile(file); // Aquí puede estar el problema si no necesitas volver a cargar estos archivos
              });
            } else {
              console.log("sin archivos");
            }
          });

        this.subirArchivosService.getFilesEntrega(this.idgrupos!, this.g_idmaterias!, this.idtarea!, this.userId!).pipe(
          catchError(error => {
            console.error('Error al recuperar archivos', error);
            return of(null);
          })
        ).subscribe(archivosData => {
          if (archivosData && Array.isArray(archivosData.files)) {
            console.log('Archivos obtenidos:', archivosData.files);
            this.archivosSubidos2 = archivosData.files;
            this.archivosSubidos2.forEach((file: any) => {
              console.log('Archivo:', file); // Esto imprimirá cada archivo
              console.log('Nombre del archivo:', file.name);
              this.uploadFile2(file); // Aquí puede estar el problema si no necesitas volver a cargar estos archivos
            });
          } else {
            console.log("sin archivos");
          }
        });

        this.alumnosService.obtenerAlumno(this.userId!).pipe(
          catchError(error => {
            console.error('Error al recuperar alumno', error);
            alert('Error al recuperar alumno');
            return of(null);
          })
        ).subscribe(alumnoData => {
          if (alumnoData) {
            this.alumno = `${alumnoData.apellidoP_Al} ${alumnoData.apellidoM_Al} ${alumnoData.nombres_Al}`;
          }
        })

        this.comentariosService.getComentariosEntrega(this.idtarea!,this.userId!).pipe(
          catchError(error => {
            console.error('Error al recuperar comentarios', error);
            return of(null);
          })
        ).subscribe(cometariosData => {
          if(cometariosData){
            cometariosData.forEach((coment: any) => {
              let emisor = 'docente';
              let nombre = this.alumno;
              if(coment.doc_al == 1){
                emisor = 'docente';
                nombre = this.docente!;
                console.log('docente del comentario',this.docente)
              }else{
                emisor = 'alumno';
                nombre = this.alumno;
              }
  
              const nuevo = {
                emisor: emisor,
                texto: coment.Comentario,
                nombre: nombre, 
                fecha: coment.c_fecha 
              };
  
              this.mensajes.push(nuevo);
            });
          }
        })
      }
    });
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      // Simular que el emisor es el alumno
      const nuevo = {
        emisor: 'alumno',
        texto: this.nuevoMensaje,
        nombre: this.alumno, // Cambia esto si es necesario
        fecha: new Date().toLocaleString() // Fecha actual
      };

      const comentario = {
        Comentario: this.nuevoMensaje,
        doc_al: 0,
        c_idtareas: this.idtarea,
        c_boleta: this.userId
      }

      this.comentariosService.createComentario(comentario).pipe(
        catchError(error => {
          console.error('Error al recuperar tarea', error);
          alert('Error al recuperar tarea');
          return of(null);
        })
      ).subscribe( comentarioData => {
        if(comentarioData){
          this.mensajes.push(nuevo); // Agregar el nuevo mensaje
          this.nuevoMensaje = ''; // Limpiar el campo
        }
      }  
      )
    }
  }

  uploadFile(file: any): void {
    const icon = this.iconSelector(file.type);
    //const fileURL = `/uploads/tareasF/${this.g_idmaterias}/${this.idgrupos}/${this.idtarea}/${file.name}`;  // Asegúrate de que esta ruta sea correcta
    const fileURL = `${this.BACKEND_BASE_URL}/uploads/tareasF/${this.g_idmaterias}/${this.idgrupos}/${this.idtarea}/${file.name}`;
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
      <div class="file-name" style="font-size: 15px; color: blue; font-weight: bold; cursor: pointer;">${file.name}</div>
      <div class="file-size" style="margin-top: 5px; font-size: 0.75rem; color: #707EA0;">${(file.size / (1024 * 1024)).toFixed(2)} MB</div>
    </div>
    `;

    li.onclick = () => {
      if (
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
        file.type === 'application/vnd.ms-powerpoint'
      ) {
        this.googleDriveService.signInAndUpload(fileURL, file.type);
      } else {
        window.open(fileURL, '_blank');
      }
    };

    this.listContainer.nativeElement.prepend(li);
  }


  uploadFile2(file: any): void {
    const icon = this.iconSelector(file.type);

    const li = document.createElement('li');
    li.classList.add('list-section', 'in-prog');
    li.style.display = 'flex';
    li.style.margin = '15px 0';
    li.style.paddingTop = '4px';
    li.style.paddingBottom = '2px';
    li.style.borderRadius = '8px';
    li.style.transitionDuration = '0.3s';

    if (file.path) {
      const fileURL = `${this.BACKEND_BASE_URL}/uploads/tareasF/${this.g_idmaterias}/${this.idgrupos}/${this.idtarea}/entregas/${this.userId}/${file.name}`;

      li.innerHTML = `
    <div class="col" style="flex: .15; text-align: center;">
      <img src="${icon}" alt="file-icon" width="40" height="50"> <!-- Tamaño fijo -->
    </div>
    <div class="col" style="flex: .78; text-align: left; font-size: 0.9rem; color: #3e4046; padding: 8px 10px;">
      <div class="file-name" style="font-size: 15px; color: blue; font-weight: bold; cursor: pointer;">${file.name}</div>
      <div class="file-size" style="margin-top: 5px; font-size: 0.75rem; color: #707EA0;">${(file.size / (1024 * 1024)).toFixed(2)} MB</div>
    </div>

    <div class="col" style="flex: .1;">
      <svg xmlns="http://www.w3.org/2000/svg" class="cross" height="20" width="20" style="fill: #8694d2; background-color: #dee6fd; position: relative; left: 50%; top: 40%; transform: translate(-50%, -50%); border-radius: 50%;">
        <path d="m5.979 14.917-.854-.896 4-4.021-4-4.062.854-.896 4.042 4.062 4-4.062.854.896-4 4.062 4 4.021-.854.896-4-4.063Z"/>
      </svg>
    </div>
    `;

      li.onclick = () => {
        if (
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type === 'application/msword' ||
          file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.type === 'application/vnd.ms-excel' ||
          file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
          file.type === 'application/vnd.ms-powerpoint'
        ) {
          this.googleDriveService.signInAndUpload(fileURL, file.type);
        } else {
          window.open(fileURL, '_blank');
        }
      };

    } else {
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
  </div>
  `;
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

      li.onclick = () => {
        if (
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type === 'application/msword' ||
          file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.type === 'application/vnd.ms-excel' ||
          file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
          file.type === 'application/vnd.ms-powerpoint'
        ) {
          this.googleDriveFileService.signIn(() => {
            this.googleDriveFileService.uploadAndOpenDocument(file);
          });
        } else {
          window.open(URL.createObjectURL(file), '_blank');
        }
      };
    }
    const crossIcon = li.querySelector('.cross') as HTMLElement;
    if (crossIcon) {
      crossIcon.onclick = () => {
        li.remove();
        this.archivosSubidos2 = this.archivosSubidos2.filter(f => f.name !== file.name);
      };
    }
    this.listContainer2.nativeElement.prepend(li);
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

  async guardarEntrega() {
    const entrega = {
      e_fecha: new Date()
    };

    try {
      // Edita la entrega y espera a que la actualización se complete
      const response = await this.entregasService.editarEntrega(this.idtarea!, this.userId!, entrega).pipe(
        catchError(error => {
          console.error('Error al guardar entrega', error);
          return of(null);
        })
      ).toPromise();

      if (response) {

        const archivosActuales = await this.subirArchivosService.getFilesEntrega(this.idgrupos!, this.g_idmaterias!, this.idtarea!, this.userId!).pipe(
          catchError(error => {
            console.error('Error al obtener archivos actuales', error);
            return of({ files: [] });
          })
        ).toPromise();
        console.log('archivos del servver', archivosActuales)
        const archivosParaEliminar = archivosActuales.files.filter((archivo: any) => {
          return !this.archivosSubidos2.some((file: any) => file.name === archivo.name);
        });

        if (archivosParaEliminar.length > 0) {
          await Promise.all(archivosParaEliminar.map(async (archivo: any) => {
            await this.subirArchivosService.deleteFileEntrega(this.idgrupos!, this.g_idmaterias!, this.idtarea!, this.userId!, archivo.name).toPromise();
            console.log(`Archivo eliminado del backend: ${archivo.name}`);
          }));
        }

        const uploadObservables = this.archivosSubidos2.map(file => {
          const archivoExiste = archivosActuales.files.some((archivo: any) => archivo.name === file.name);

          if (archivoExiste) {
            console.log(`El archivo ya existe y no se subirá: ${file.name}`);
            return null; // Devuelve null si el archivo ya existe
          }
          const listItems = this.listContainer2.nativeElement.querySelectorAll('li');
          let li: HTMLElement | null = null;

          listItems.forEach((item: HTMLElement) => {
            const nameElement = item.querySelector('.file-name .name');
            if (nameElement && nameElement.textContent === file.name) {
              li = item;
            }
          });

          if (!li) {
            console.error(`Elemento <li> no encontrado para el archivo: ${file.name}`);
            return null;
          }

          return this.subirArchivosService.uploadEntrega(file, this.idgrupos!, this.g_idmaterias!, this.idtarea!, this.userId!).pipe(
            catchError(err => {
              console.error('Error al subir el archivo', err);
              li?.remove();
              return of(null);
            })
          );
        }).filter(obs => obs !== null);

        if (uploadObservables.length > 0) {
          const uploadResponses = await forkJoin(uploadObservables).toPromise();

          if (uploadResponses) {
            uploadResponses.forEach((response: any) => {
              if (response && response.body) {
                console.log('Ruta completa:', response.body.file.path);
              }
            });

            console.log('Todos los archivos se han subido con éxito.');
            this.archivosSubidos2 = [];
            this.listContainer2.nativeElement.innerHTML = '';
          }
        }

        this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias, 'tareas-a']);
      }
    } catch (error) {
      console.error('Error al guardar entrega', error);
    }
  }


}

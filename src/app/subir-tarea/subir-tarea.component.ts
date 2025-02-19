import { Component, inject, ElementRef, ViewChild, OnInit } from '@angular/core';
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
import { EntregasService } from '../servicios/entregas.service';  // Importa CommonModule para las funcionalidades comunes de Angular
import { GoogleDriveService } from '../servicios/google-drive.service';
import { GoogleDriveFileService } from '../servicios/google-drive-file.service';
import { environment } from '../../environments/environments';

// Declara la variable global 'google' para usar los servicios de Google
declare var google: any;

@Component({
  selector: 'app-subir-tarea',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule],
  templateUrl: './subir-tarea.component.html',
  styleUrl: './subir-tarea.component.css',
  host: { 'ngSkipHydration': '' }

})
export class SubirTareaComponent implements OnInit{
  idgrupos: string | null = null;
  userId: string | null = null;
  docente: string | null = "Uriel Alejandro";
  g_idmaterias: string | null = null;
  titulo: string = "";
  descrip: string = "";
  idtarea: string | null = null;
  archivosSubidos: File[] = [];
  archivosSubidos2: File[] = [];
  fechaVencimiento: string = '';
  BACKEND_BASE_URL = `${environment.apiUrl}:8080`;
  abilitar = true;
  
  @ViewChild('listContainer') listContainer!: ElementRef<HTMLUListElement>;

  @ViewChild('listContainer2') listContainer2!: ElementRef<HTMLUListElement>;
  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute,
    private tareasService: TareasService,
    private router: Router,
    private subirArchivosService: SubirArchivosService,
    private authService: AuthService,
    private docentesService: DocentesService,
    private gruposService: GruposService,
    private googleDriveService: GoogleDriveService,
    private googleDriveFileService: GoogleDriveFileService,
    private entregasService: EntregasService
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

  mensajes = [
    { emisor: 'alumno', texto: 'Este es un mensaje del alumno.', nombre: 'Alan Ricardo', fecha: new Date().toLocaleString() },
    { emisor: 'docente', texto: 'Este es un mensaje del docente.', nombre: 'Uriel Alejandro', fecha: new Date().toLocaleString() }
  ];

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
              this.docente = `${docenteData.apellidoP_Do} ${docenteData.apellidoM_Do} ${docenteData.nombres_Do}`;
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

              if(new Date(tareaData.fecha_Entrega) > new Date()){
                this.abilitar = false;                
              }

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
            } else {
              console.error('tarea no existe');
            }
          });
      }
    });
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      // Simular que el emisor es el alumno
      const nuevo = {
        emisor: 'alumno',
        texto: this.nuevoMensaje,
        nombre: 'Alan Ricardo', // Cambia esto si es necesario
        fecha: new Date().toLocaleString() // Fecha actual
      };

      this.mensajes.push(nuevo); // Agregar el nuevo mensaje
      this.nuevoMensaje = ''; // Limpiar el campo
    }
  }

  uploadFile(file: any): void {
    const icon = this.iconSelector(file.type);
    const fileURL = `${this.BACKEND_BASE_URL}/uploads/tareasF/${this.g_idmaterias}/${this.idgrupos}/${this.idtarea}/${file.name}`; 
    //const fileURL = file.path; 
    console.log('URL generada para el archivo:', fileURL);
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

uploadFile2(file: File): void {
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

  this.listContainer2.nativeElement.prepend(li);

  const crossIcon = li.querySelector('.cross') as HTMLElement;
  const progressBar = li.querySelector('.progress-bar') as HTMLElement;
  const progressText = li.querySelector('.progress-text') as HTMLElement;
  li.onclick = () => { 
    if ( file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      file.type === 'application/msword' || 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
      file.type === 'application/vnd.ms-excel' || 
      file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || 
      file.type === 'application/vnd.ms-powerpoint' 
    ) { 
      this.googleDriveFileService.signIn(() => { 
        this.googleDriveFileService.uploadAndOpenDocument(file); }); 
    } else { 
      window.open(URL.createObjectURL(file), '_blank'); 
    } 
  };

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
      this.archivosSubidos2 = this.archivosSubidos2.filter(f => f.name !== file.name);
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

  guardarEntrega() {
    if(this.archivosSubidos2.length>0){
    const entrega = {
      e_idtareas: this.idtarea,
      e_boleta: this.userId
    }
    //console.log(tarea);
    this.entregasService.createEntrega(entrega).pipe(
      catchError(error => {
        console.error('Error al guardar entrega', error);
        return of(null);
      })
    ).subscribe({
      next: response => {
        if (response) {
          const idtareas = response.e_idtareas;
          const boletaAl = response.e_boleta;
          console.log(response);
          if (this.archivosSubidos2.length === 0) {
            this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias, 'tareas-a']);
            //console.warn('No hay archivos para subir.');
            return;
          }

          const uploadObservables = this.archivosSubidos2.map(file => {
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
              return null; // Devuelve null si no se encuentra el elemento
            }

            return this.subirArchivosService.uploadEntrega(file, this.idgrupos!, this.g_idmaterias!, idtareas, boletaAl).pipe(
              catchError(err => {
                console.error('Error al subir el archivo', err);
                li?.remove();
                return of(null); // Devuelve un observable nulo en caso de error
              })
            );
          }).filter(obs => obs !== null); // Filtrar nulls

          if (uploadObservables.length > 0) {
            forkJoin(uploadObservables).subscribe({
              next: (responses) => {
                responses.forEach((response: any) => {
                  if (response && response.body) {
                    /*const archivoTarea = {
                      dirección_DT: response.body.file.path,
                      nombre_DT:response.body.file.name,
                      dt_idtareas: idtareas
                    }*/

                    this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias, 'tareas-a']);
                    //console.log('Ruta completa:', response.body.file.path);
                  }
                });
              },
              complete: () => {
                console.log('Todos los archivos se han subido con éxito.');
                // Limpiar la lista de archivos después de completar la subida
                this.archivosSubidos2 = [];
                this.listContainer2.nativeElement.innerHTML = ''; // Limpiar la lista en la interfaz
              }
            });
          }

        }
      },
      error: error => console.error('Error al crear tarea', error),
      complete: () => {
        console.log('Solicitud de creación de tarea completada');
      }
    }
    )
  }else{
    alert("no puede entregar una tarea vacia")
  }
}

}

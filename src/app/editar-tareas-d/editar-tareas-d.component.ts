import { Component, ElementRef, ViewChild, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SubirArchivosComponent } from '../subir-archivos/subir-archivos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TareasService } from '../servicios/tareas.service';
import { catchError, of, forkJoin, tap } from 'rxjs';
import { SubirArchivosService } from '../subir-archivos/subir-archivos.service';
import { AuthService } from '../servicios/auth.service';
import { DocentesService } from '../servicios/docentes.service';

@Component({
  selector: 'app-editar-tareas-d',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule,
    FormsModule],
  templateUrl: './editar-tareas-d.component.html',
  styleUrl: './editar-tareas-d.component.css',
  host: { 'ngSkipHydration': '' }

})
export class EditarTareasDComponent implements OnInit {
  idgrupos: string | null = null;
  userId: string | null = null;
  docente: string | null = null;
  idtarea: string | null = null;
  g_idmaterias: string | null = null;
  titulo: string = "";
  descrip: string = "";
  archivosSubidos: File[] = [];

  @ViewChild('listContainer') listContainer!: ElementRef<HTMLUListElement>;

  readonly dialog = inject(MatDialog);

  constructor(private route: ActivatedRoute,
    private tareasService: TareasService,
    private router: Router,
    private subirArchivosService: SubirArchivosService,
    private authService: AuthService,
    private docentesService: DocentesService
  ) {

  }

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];
      this.userId = this.authService.getUserId();
  
      if (this.userId) {
        this.docentesService.obtenerDocente(this.userId)
          .pipe(
            catchError(error => {
              console.error('Error al recuperar docente', error);
              alert('Error al recuperar docente');
              return of([]);
            })
          ).subscribe(docenteData => {
            if (docenteData) {
              this.docente = `${docenteData.apellidoP_Do} ${docenteData.nombres_Do} ${docenteData.apellidoM_Do}`;
            }
          });
      }
  
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
                this.fechaVencimiento.nativeElement.value = new Date(tareaData.fecha_Entrega).toISOString().slice(0, 16);
  
                this.subirArchivosService.getFiles(this.idgrupos!, this.g_idmaterias!, this.idtarea!)
                  .pipe(
                    catchError(error => {
                      console.error('Error al recuperar archivos', error);
                      alert('Error al recuperar archivos');
                      return of(null);
                    })
                  ).subscribe(archivosData => {
                    if (archivosData) {
                      console.log(archivosData);
                      this.archivosSubidos=archivosData.files
                      this.archivosSubidos.forEach((file: any) => {
                        console.log(file)
                        console.log(file.name)
                        this.uploadFile(file);
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
    });
  }
  
  



  openDialog() {
    const dialogRef = this.dialog.open(SubirArchivosComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {  // Asegúrate de que `result` tenga archivos
        if (this.archivosSubidos.length === 0) {  // Verifica si está vacío
          this.archivosSubidos = result;  // Almacena los archivos recibidos
        } else {
          this.archivosSubidos.push(...result);  // Añade cada archivo individualmente
        }

        console.log("Archivos subidos:", this.archivosSubidos);
        this.listContainer.nativeElement.innerHTML = ''; // Limpiar la lista en la interfaz
        this.archivosSubidos.forEach(file => {
          this.uploadFile(file);
        });
      }
    });
}


  guardarTarea() {
    const tarea = {
      fecha_Entrega: this.fechaVencimiento.nativeElement.value,
      titulo_T: this.titulo,
      descripción_T: this.descrip,
      ta_idmaterias: this.g_idmaterias,
      ta_idgrupos: this.idgrupos
    }
    //console.log(tarea);
    this.tareasService.createTarea(tarea).pipe(
      catchError(error => {
        console.error('Error al crear tarea', error);
        return of(null);
      })
    ).subscribe({
      next: response => {
        if (response) {
          const idtareas = response.idtareas;
          console.log(response);
          if (this.archivosSubidos.length === 0) {
            this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias, 'listado-tareas-g']);
            //console.warn('No hay archivos para subir.');
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

            return this.subirArchivosService.upload(file, this.idgrupos!, this.g_idmaterias!, idtareas).pipe(
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

                    this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias, 'listado-tareas-g']);
                    //console.log('Ruta completa:', response.body.file.path);
                  }
                });
              },
              complete: () => {
                console.log('Todos los archivos se han subido con éxito.');
                // Limpiar la lista de archivos después de completar la subida
                this.archivosSubidos = [];
                this.listContainer.nativeElement.innerHTML = ''; // Limpiar la lista en la interfaz
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

  @ViewChild('fechaVencimiento') fechaVencimiento!: ElementRef<HTMLInputElement>;
  @ViewChild('validationMessage') validationMessage!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    const input = this.fechaVencimiento.nativeElement;
    const validationMessage = this.validationMessage.nativeElement;

    // Escucha el evento de entrada en el campo
    input.addEventListener('input', () => {
      const currentDate = new Date();
      if (input.validity.valid && new Date(input.value) > currentDate) {
        validationMessage.style.display = 'none'; // Oculta el mensaje de validación
      } else {
        validationMessage.style.display = 'block'; // Muestra el mensaje de validación
      }
    });

    // Establecer el valor de input a la fecha actual
    const currentDate = new Date();
    input.value = currentDate.toISOString().slice(0, 16); // Establece el valor en formato datetime-local
  }
}
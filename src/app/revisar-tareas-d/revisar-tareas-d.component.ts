import { CommonModule } from '@angular/common';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { SubirArchivosService } from '../subir-archivos/subir-archivos.service';
import { AuthService } from '../servicios/auth.service';
import { GoogleDriveService } from '../servicios/google-drive.service';
import { EntregasService } from '../servicios/entregas.service';
import { AlumnosService } from '../servicios/alumnos.service';
import { catchError, of, forkJoin, tap } from 'rxjs';
import { TareasService } from '../servicios/tareas.service';
import { DocentesService } from '../servicios/docentes.service';
import { ComentariosService } from '../servicios/comentarios.service';
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-revisar-tareas-d',
  standalone: true,
  imports: [MatButtonModule, CommonModule, FormsModule],
  templateUrl: './revisar-tareas-d.component.html',
  styleUrl: './revisar-tareas-d.component.css',
  host: { 'ngSkipHydration': '' }

})
export class RevisarTareasDComponent implements OnInit {

  alumno: string = "";
  docente: string = "";
  boleta: string | null = null;
  idtarea: string | null = null;
  entrega: any;
  g_idmaterias: string | null = null;
  idgrupos: string | null = null;
  tarea: any;
  idDocente: string | null = null;
  archivosSubidos: File[] = [];

  BACKEND_BASE_URL = `${environment.apiUrl}:8080`;

  @ViewChild('listContainer') listContainer!: ElementRef<HTMLUListElement>;

  mensajes = [
    { emisor: 'docente', nombre: 'Docente', fecha: '2024-12-16T16:39:08.000Z', texto: 'Mensaje del docente.' },
    { emisor: 'alumno', nombre: 'Alumno', fecha: '2024-12-16T16:39:09.000Z', texto: 'Mensaje del alumno.' },
  ];

  nuevoMensaje = '';
  calificacion: number | null = null;
  calificacionFueraDeRango: boolean = false;  // Agregar propiedad
  decimalesInvalidos: boolean = false;        // Agregar propiedad

  constructor(private route: ActivatedRoute,
    private router: Router,
    private subirArchivosService: SubirArchivosService,
    private alumnosService: AlumnosService,
    private docentesService: DocentesService,
    private authService: AuthService,
    private googleDriveService: GoogleDriveService,
    private entregasService: EntregasService,
    private tareasService: TareasService,
    private comentariosService: ComentariosService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.idtarea = params['e_idtareas'];
      this.boleta = params['e_boleta'];

      this.idDocente = this.authService.getUserId();

      this.docentesService.obtenerDocente(this.idDocente).pipe(
        catchError(error => {
          console.error('Error al recuperar docente', error);
          alert('Error al recuperar docente');
          return of(null);
        })
      ).subscribe(docenteData => {
        if(docenteData){
          this.docente = `${docenteData.apellidoP_Do} ${docenteData.apellidoM_Do} ${docenteData.nombres_Do}`;
          console.log('docente',this.docente)
        }
      })
      this.alumnosService.obtenerAlumno(this.boleta).pipe(
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

      this.entregasService.obtenerEntregasByTareaAlumno(this.idtarea!, this.boleta!).pipe(
        catchError(error => {
          console.error('Error al recuperar entrega', error);
          alert('Error al recuperar entrega');
          return of(null);
        })
      ).subscribe(entregaData => {
        if (entregaData) {
          this.entrega = entregaData;

          this.subirArchivosService.getFilesEntrega(this.idgrupos!, this.g_idmaterias!, this.idtarea!, this.boleta!).pipe(
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
        }
      })

      this.comentariosService.getComentariosEntrega(this.idtarea!,this.boleta!).pipe(
        catchError(error => {
          console.error('Error al recuperar comentarios', error);
          return of(null);
        })
      ).subscribe(cometariosData => {
        if(cometariosData){
          cometariosData.forEach((coment: any) => {
            let emisor = 'docente';
            let nombre = this.docente;
            if(coment.doc_al == 1){
              emisor = 'docente';
              nombre = this.docente;
            }else{
              emisor = 'alumno';
              nombre = this.alumno;
            }

            const nuevo = {
              emisor: emisor,
              texto: coment.Comentario,
              nombre: nombre, // Cambia esto si es necesario
              fecha: coment.c_fecha // Fecha actual
            };

            this.mensajes.push(nuevo);
          });
        }
      })
    })

    this.route.parent?.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];


      this.tareasService.findTareaById(this.g_idmaterias!, this.idgrupos!, this.idtarea!)
        .pipe(
          catchError(error => {
            console.error('Error al recuperar tarea', error);
            alert('Error al recuperar tarea');
            return of(null);
          })
        ).subscribe(tareaData => {
          if (tareaData) {
            this.tarea = tareaData
          }
        })
    })
  }
  // Ordena los mensajes de manera que los del docente aparezcan primero
  getMensajesOrdenados() {
    return this.mensajes.sort((a, b) => {
      if (a.emisor === 'docente' && b.emisor === 'alumno') {
        return -1; // El docente va primero
      }
      if (a.emisor === 'alumno' && b.emisor === 'docente') {
        return 1; // El alumno va después
      }
      return 0; // No cambia el orden si ambos son del mismo emisor
    });
  }

  enviarMensaje() {
    if (this.nuevoMensaje.trim()) {
      // Simular que el emisor es el alumno
      const nuevo = {
        emisor: 'docente',
        texto: this.nuevoMensaje,
        nombre: 'Uriel Alejandro', // Cambia esto si es necesario
        fecha: new Date().toLocaleString() // Fecha actual
      };

      const comentario = {
        Comentario: this.nuevoMensaje,
        doc_al: 1,
        c_idtareas: this.idtarea,
        c_boleta: this.boleta
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

  guardarCalificacion() {
    if (this.calificacion !== null) {
      // Guardar la calificación (lógica adicional)
      console.log(`Calificación guardada: ${this.calificacion}`);
    } else {
      console.log('No se ha ingresado una calificación');
    }
  }

  validarDecimales(): void {
    if (this.calificacion !== null) {
      // Validar rango
      this.calificacionFueraDeRango = this.calificacion < 0 || this.calificacion > 10;

      // Validar decimales (máximo 2 decimales)
      const partes = this.calificacion.toString().split('.');
      this.decimalesInvalidos = partes[1] ? partes[1].length > 2 : false;

      // Corregir si la calificación está fuera de rango
      if (this.calificacionFueraDeRango) {
        setTimeout(() => {
          // Ajustar la calificación al límite más cercano (0 o 10), usando coalescencia nula
          this.calificacion = (this.calificacion ?? 0) < 0 ? 0 : 10;

          // Una vez corregido, quitar el mensaje de error
          this.calificacionFueraDeRango = false;
        }, 1000); // Retraso para que se muestre el mensaje antes de corregir
      }

      // Corregir si los decimales son inválidos
      if (this.decimalesInvalidos) {
        setTimeout(() => {
          const valorSinDecimales = partes[0] + (partes[1] ? '.' + partes[1].substring(0, 2) : '');
          this.calificacion = parseFloat(valorSinDecimales ?? '0');

          // Quitar el mensaje de decimales inválidos
          this.decimalesInvalidos = false;
        }, 1000); // Retraso para que se muestre el mensaje antes de corregir
      }
    }
  }
  uploadFile(file: any): void {
    const icon = this.iconSelector(file.type);
    const fileURL = `${this.BACKEND_BASE_URL}/uploads/tareasF/${this.g_idmaterias}/${this.idgrupos}/${this.idtarea}/entregas/${this.boleta}/${file.name}`; 
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

  calificar(){
    const entrega = {
      calificación: this.calificacion
    };

    this.entregasService.editarEntrega(this.idtarea!, this.boleta!, entrega).pipe(
      catchError(error => {
        console.error('Error al guardar entrega', error);
        return of(null);
      })
    ).subscribe(entregaData =>{
      if (entregaData) {
        this.router.navigate(['/menu-materia', this.idgrupos, this.g_idmaterias, 'listado-entregas-tareas', this.idtarea]);
      }
    })
  }

}

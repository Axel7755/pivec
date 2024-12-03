import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { DocentesService } from '../../servicios/docentes.service';
import { AlumnosService } from '../../servicios/alumnos.service';
import { forkJoin, of, mergeMap, catchError, Observable } from 'rxjs';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})
export class VideoPlayerComponent implements OnInit {
  @Input() stream: any;
  userId: string | null = null;
  isDocente: boolean = false;
  nombre: string = 'usuario';

  constructor(
    private authService: AuthService,
    private docentesService: DocentesService,
    private alumnosService: AlumnosService,
  ) {
    
  }

  ngOnInit(): void {
    /*this.userId = this.authService.getUserId();
    this.isDocente = this.authService.getUserRole() === 'docente';
    
    if(this.isDocente){
      this.docentesService.obtenerDocente(this.userId).pipe(
        catchError(error => {
          console.error('Error al recuperar docente', error);
          alert('Error al recuperar docente');
          return of(null); // Devolver null en caso de error
        })
      ).subscribe(docenteData => {
        if(docenteData){
          this.nombre = `${docenteData.apellidoP_Do} ${docenteData.nombres_Do} ${docenteData.apellidoM_Do}`;
        }
      })
    }else{
      this.alumnosService.obtenerAlumno(this.userId).pipe(
        catchError(error => {
          console.error('Error al recuperar alumno', error);
          alert('Error al recuperar alumno');
          return of(null); // Devolver null en caso de error
        })
      ).subscribe(AlumnoData => {
        if(AlumnoData){
          this.nombre = `${AlumnoData.apellidoP_Al} ${AlumnoData.nombres_Al} ${AlumnoData.apellidoM_Al}`;
        }
      })
    }*/
  }

}

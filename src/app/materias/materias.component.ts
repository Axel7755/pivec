import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../servicios/auth.service';
import { GruposService } from '../servicios/grupos.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MateriasService } from '../servicios/materias.service';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MateriasComponent {
  isDocente: boolean = false;
  userId: string | null = null;
  grupos: any[] = [];
  materias: any[] = [];

  constructor(private authService: AuthService, private gruposService: GruposService,
    private materiasService:MateriasService
  ) { }

  ngOnInit() {
    this.isDocente = this.authService.getUserRole() === 'docente';
    this.userId = this.authService.getUserId();
    console.log(this.userId);
    if (this.userId) {
      if (this.isDocente) {
        //console.log(this.userId);
        this.gruposService.getGruposByDocente(this.userId).pipe(
          catchError(error => {
            console.error('Error al recuperar grupos', error);
            alert('Error al recuperar grupos')
            return of(null);
          })
        ).subscribe(data => {
          if (data) {
            this.grupos = data;
            //console.log(this.grupos);
            var x=0;
            this.grupos.forEach(grupob => {
              this.materiasService.findMateriaById(grupob.g_idmaterias).pipe(
                catchError(error => {
                  console.error('Error al recuperar materias', error);
                  alert('Error al recuperar materias')
                  return of(null);
                })
              ).subscribe(materia => {
                if(materia){
                  //console.log(materia)
                  this.materias[x]=materia
                  x++;
                }else{
                  alert('problemas con las materias')
                }
              })
            });
            console.log(this.materias)
          }else{
            alert('sin grupos')
          }
        })
      }
    }
  }
}
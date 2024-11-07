import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../servicios/auth.service';
import { GruposService } from '../servicios/grupos.service';
import { MateriasService } from '../servicios/materias.service';
import { forkJoin, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.css'],
})
export class MateriasComponent implements OnInit {
  isDocente: boolean = false;
  userId: string | null = null;
  grupos: any[] = [];
  materias: any[] = [];
  combinados: any[] = [];

  constructor(
    private authService: AuthService,
    private gruposService: GruposService,
    private materiasService: MateriasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isDocente = this.authService.getUserRole() === 'docente';
    this.userId = this.authService.getUserId();
    if (this.userId && this.isDocente) {
      this.gruposService
        .getGruposByDocente(this.userId)
        .pipe(
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
    }
  }
  irGeneralMaterias(grupo: any) {
    this.router.navigate([`/menu-materia`, grupo.idgrupos, grupo.g_idmaterias]);
  }
}

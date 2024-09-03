import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list'

export interface Section {
  icon: string;
  name: string;
  route: string;
}

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule,
     RouterOutlet, MatListModule],
  template: `
    <mat-sidenav-container>
      <mat-sidenav opened mode="side">
        <div class="sidenav-header">
          <h2 class="tit1">PIV</h2>
          <h2 class="tit2">EC</h2>
          <button mat-icon-button color="warn" class="desplegable">
            <mat-icon>keyboard_arrow_left</mat-icon>
          </button>
        </div>
        <mat-nav-list>
        @for (seccion of secciones; track seccion) {
          <a mat-list-item>
            <mat-icon matListItemIcon  class="blanco">
            {{seccion.icon}}
            </mat-icon>
            <span matListItemTitle  class="blanco">
            {{seccion.name}}
            </span>
          </a>
        }
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content class="content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
  
    </mat-sidenav-container>`,
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {
  secciones: Section[] = [
    {
      icon:'business_center',
      name: 'Materias',
      route: ''
    },
    {
      icon:'assignment',
      name: 'Tareas',
      route: ''
    },
    {
      icon:'movie',
      name: ' Videos Compartidos',
      route: ''
    },
    {
      icon:'school',
      name: 'Google Académico',
      route: ''
    },
    {
      icon:'edit',
      name: 'Modificar horario',
      route: ''
    },
  ];
}

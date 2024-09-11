import { Component, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { NgClass } from '@angular/common';

export interface Section {
  icon: string;
  name: string;
  route: string;
}

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule,
     RouterOutlet, MatListModule, RouterLink, RouterLinkActive, NgClass],
  template: `
    <mat-sidenav-container>
      <mat-sidenav  opened mode="side" [ngClass]="collapsed ? 'sidenav-collapsed': ''">
        <div class="sidenav-header" [ngClass]="collapsed ? 'sidenav-header-collapsed': ''">
        @if (!collapsed) {
          <h2 class="tit1">PIV</h2>
          <h2 class="tit2">EC</h2>
        }
          <button mat-icon-button (click)="collapse()" color="warn" class="desplegable">
          @if (!collapsed) {
            <mat-icon>keyboard_arrow_left</mat-icon>
          }@else{
            <mat-icon>keyboard_arrow_right</mat-icon>
          }
          </button>
        </div>
        <mat-nav-list>
        @for (seccion of secciones; track seccion) {
          <a mat-list-item class="tamanio-auto" routerLink={{seccion.route}} [routerLinkActive]="'active'" [routerLinkActiveOptions]="{exact: true}">
            <mat-icon matListItemIcon  class="blanco">
            {{seccion.icon}}
            </mat-icon>
            @if (!collapsed) {
              <span matListItemTitle class="textoblanco">
                {{seccion.name}}
              </span>
            }
            
          </a>
        }
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content [ngClass]="collapsed ? 'sidenav-collapsed-content':''">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
  
    </mat-sidenav-container>`,
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {
  collapsed = false;
  collapse(): void{
    this.collapsed=!this.collapsed;
  }
  secciones: Section[] = [
    {
      icon:'business_center',
      name: 'Materias',
      route: '/menu-principal/materias'
    },
    {
      icon:'assignment',
      name: 'Tareas',
      route: '/menu-principal/tareas'
    },
    {
      icon:'movie',
      name: ' Videos Compartidos',
      route: '/menu-principal/videos-compartidos'
    },
    {
      icon:'school',
      name: 'Google Académico',
      route: '/menu-principal/google-academico'
    },
    {
      icon:'edit',
      name: 'Modificar horario',
      route: ''
    },
  ];
}

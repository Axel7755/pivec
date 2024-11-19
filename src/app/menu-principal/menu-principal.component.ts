import { Component, ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { NgClass } from '@angular/common';
import { InReuComponent } from "../video-call/in-reu/in-reu.component";

export interface Section {
  icon: string;
  name: string;
  route: string;
}

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule,
    RouterOutlet, MatListModule, RouterLink, RouterLinkActive, NgClass, InReuComponent],
     templateUrl: './menu-principal.component.html',
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

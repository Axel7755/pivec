import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

export interface Section {
  icon: string;
  name: string;
  route: string;
}

@Component({
  selector: 'app-menu-materia',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule,
    RouterOutlet, MatListModule, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './menu-materia.component.html',
  styleUrl: './menu-materia.component.css'
})
export class MenuMateriaComponent {
  collapsed = false;
  collapse(): void{
    this.collapsed=!this.collapsed;
  }
  secciones: Section[] = [
    {
      icon:'interests',
      name: 'General',
      route: '/menu-principal/materias'
    },
    {
      icon:'assignment',
      name: 'Tareas',
      route: '/menu-principal/tareas'
    },
    {
      icon:'theaters',
      name: ' Clases Grabadas',
      route: '/menu-principal/videos-compartidos'
    },
  ];
}

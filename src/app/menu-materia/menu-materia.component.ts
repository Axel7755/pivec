import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';

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
export class MenuMateriaComponent implements OnInit {
  idgrupos: string | null = null;
  g_idmaterias: string | null = null;
  secciones: Section[] = []

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Usa `parent` para acceder a los parámetros de `menu-materia`
    this.route.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];
      console.log('ID de grupo:', this.idgrupos);
      console.log('ID de materia:', this.g_idmaterias);

      this.secciones = [
        {
          icon: 'interests',
          name: 'General',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/general-a`
        },
        {
          icon: 'assignment',
          name: 'Tareas',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/tareas-a`
        },
        {
          icon: 'theaters',
          name: 'Clases Grabadas',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/video-player`
        },
      ];
      
    });
  }
  collapsed = false;
  collapse(): void{
    this.collapsed=!this.collapsed;
  }
  
}

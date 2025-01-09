import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet, ActivatedRoute } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { Router } from '@angular/router';
import { ChatBotDComponent } from "../chat-bot-d/chat-bot-d.component";


export interface Section {
  icon: string;
  name: string;
  route: string;
}

@Component({
  selector: 'app-menu-materia',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, CommonModule,
    RouterOutlet, MatListModule, RouterLink, RouterLinkActive, ChatBotDComponent],
  templateUrl: './menu-materia.component.html',
  styleUrl: './menu-materia.component.css'
})
export class MenuMateriaComponent implements OnInit {
  idgrupos: string | null = null;
  g_idmaterias: string | null = null;
  secciones: Section[] = []
  collapsed = false;
  isDocente: boolean = false;
  userId: string | null = null;

  constructor(private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Usa `parent` para acceder a los parámetros de `menu-materia`
    this.route.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];
      //console.log('ID de grupo:', this.idgrupos);
      //console.log('ID de materia:', this.g_idmaterias);      
    });

    this.isDocente = this.authService.getUserRole() === 'docente';
    this.userId = this.authService.getUserId();
    if (this.userId && this.isDocente) {
      this.secciones = [
        {
          icon: 'interests',
          name: 'General',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/general-a`
        },
        {
          icon: 'assignment',
          name: 'Tareas',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/listado-tareas-g`
        },
        {
          icon: 'theaters',
          name: 'Clases Grabadas',
          route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/clases-grabadas`
        },
      ];
    }else{

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
        route: `/menu-materia/${this.idgrupos}/${this.g_idmaterias}/clases-grabadas`
      },
    ];
  }
  }
  collapse(): void {
    this.collapsed = !this.collapsed;
    
    // Forzar detección de cambios para actualizar el diseño de forma inmediata
    this.ngZone.run(() => {
      Promise.resolve().then(() => this.cdRef.detectChanges());
    });
  }
  
  irPaginaInicial(){
    this.router.navigate([`/menu-principal/materias`]);
  }

  exit(){
    this.authService.logout();
    this.router.navigate([`/`]);
  }
  
}

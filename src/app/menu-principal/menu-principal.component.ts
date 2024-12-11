import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { InReuComponent } from "../video-call/in-reu/in-reu.component";
import { ChatBotDComponent } from "../chat-bot-d/chat-bot-d.component";
import { AuthService } from '../servicios/auth.service';
import { ChatBotAComponent } from "../chat-bot-a/chat-bot-a.component";

export interface Section {
  icon: string;
  name: string;
  route: string;
}

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, CommonModule,
    RouterOutlet, MatListModule, RouterLink, RouterLinkActive, NgClass, InReuComponent, ChatBotDComponent, ChatBotAComponent],
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {
  collapsed = false;

  isDocente: boolean = false;
  userId: string | null = null;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.isDocente = this.authService.getUserRole() === 'docente';
    this.userId = this.authService.getUserId();
    console.log(`isDocente: ${this.isDocente}`);
    console.log(`userId: ${this.userId}`);
  }

  collapse(): void {
    this.collapsed = !this.collapsed;
  }

  secciones: Section[] = [
    {
      icon: 'business_center',
      name: 'Materias',
      route: '/menu-principal/materias'
    },
    {
      icon: 'assignment',
      name: 'Tareas',
      route: '/menu-principal/tareas'
    },
    {
      icon: 'movie',
      name: 'Videos Compartidos',
      route: '/menu-principal/videos-compartidos'
    },
    {
      icon: 'translate',
      name: 'Traductor',
      route: '/menu-principal/traductor'
    },
    {
      icon: 'school',
      name: 'Google Académico',
      route: '/menu-principal/google-academico'
    },
    {
      icon: 'edit',
      name: 'Modificar horario',
      route: ''
    },
  ];
}

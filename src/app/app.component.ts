import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './loging-regis/login.component';
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    LoginComponent
    ],
  template: `
<<<<<<< HEAD
  <router-outlet></router-outlet>
=======
  <app-login></app-login>
>>>>>>> 39e6f1d (Se completo las modificaciones de horario)
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

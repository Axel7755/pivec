import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
import { LoginComponent } from './loging-regis/login.component';
=======
>>>>>>> 4d05ec1 (errores)
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
import { LoginComponent } from './loging-regis/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet, MenuPrincipalComponent, LoginComponent],
  template: `
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  <router-outlet></router-outlet>
=======
  <app-login></app-login>
  <app-menu-principal></app-menu-principal>
<<<<<<< HEAD
>>>>>>> e1201ee (errores)
=======
  <app-menu-principal></app-menu-principal>
=======
>>>>>>> 39e6f1d (Se completo las modificaciones de horario)
  <app-login></app-login>
>>>>>>> 4d05ec1 (errores)
=======
  <router-outlet></router-outlet>
>>>>>>> fbce96b (cam)
=======
>>>>>>> e1201ee (errores)
=======
  <app-menu-principal></app-menu-principal>
  <app-login></app-login>
>>>>>>> 4d05ec1 (errores)
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

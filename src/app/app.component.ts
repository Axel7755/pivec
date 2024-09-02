import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
import { LoginComponent } from './loging-regis/login.component';
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    LoginComponent, MenuPrincipalComponent],
  template: `
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
  <app-login></app-login>
>>>>>>> 4d05ec1 (errores)
=======
  <router-outlet></router-outlet>
>>>>>>> fbce96b (cam)
=======
>>>>>>> e1201ee (errores)
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

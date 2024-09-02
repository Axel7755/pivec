import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  <router-outlet></router-outlet>
=======
  <app-login></app-login>
  <app-menu-principal></app-menu-principal>
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

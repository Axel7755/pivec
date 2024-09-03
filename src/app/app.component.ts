import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
import { LoginComponent } from './loging-regis/login.component';
=======
>>>>>>> 4d05ec1 (errores)
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
=======
>>>>>>> fb6d11c (rutas aun co errores)
import { LoginComponent } from './loging-regis/login.component';
=======
import { LoginComponent } from './loging-regis/login.component';
>>>>>>> 49c763e (rutas aun co errores)
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    RouterOutlet, MenuPrincipalComponent, LoginComponent],
  template: `
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  <router-outlet></router-outlet>
>>>>>>> 93f3553 (cambios)
=======
    RouterOutlet, LoginComponent, MenuPrincipalComponent],
  template: `  
  <app-login></app-login>
>>>>>>> fb6d11c (rutas aun co errores)
=======
  <router-outlet></router-outlet>
>>>>>>> f3f771e (cambios)
=======
    RouterOutlet, LoginComponent, MenuPrincipalComponent],
  template: `  
  <app-login></app-login>
>>>>>>> 49c763e (rutas aun co errores)
=======
    RouterOutlet,
    LoginComponent
    ],
  template: `
<<<<<<< HEAD
  <router-outlet></router-outlet>
<<<<<<< HEAD
>>>>>>> 608f0da (redireccionamientos arreglados)
=======
=======
  <app-login></app-login>
>>>>>>> 39e6f1d (Se completo las modificaciones de horario)
>>>>>>> 2d227f3 (Se completo las modificaciones de horario)
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

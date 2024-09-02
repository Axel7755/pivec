import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
=======
>>>>>>> 7d44697 (errores)
import { LoginComponent } from './loging-regis/login.component';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4d05ec1 (errores)
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
=======
>>>>>>> fb6d11c (rutas aun co errores)
import { LoginComponent } from './loging-regis/login.component';
=======
import { LoginComponent } from './loging-regis/login.component';
>>>>>>> 49c763e (rutas aun co errores)
=======
<<<<<<< HEAD
=======
import { RegistroPageComponent } from "./loging-regis/registro-page.component";
import { LateralLogin } from "./loging-regis/sub-componentes/lateral.component";
>>>>>>> 132bd3f (cambios redireciones)
<<<<<<< HEAD
>>>>>>> eb6bac0 (cambios redireciones)
=======
=======
>>>>>>> 5135880 (cam)
<<<<<<< HEAD
>>>>>>> 498e3e9 (cam)
=======
=======
import { RegistroPageComponent } from "./loging-regis/registro-page.component";
import { LateralLogin } from "./loging-regis/sub-componentes/lateral.component";
>>>>>>> 706d3bf (cambios redireciones)
<<<<<<< HEAD
>>>>>>> e51860c (cambios redireciones)
=======
=======
>>>>>>> 17a0d46 (cam)
<<<<<<< HEAD
>>>>>>> e0de856 (cam)
=======
=======
>>>>>>> f7bc1d1 (errores)
>>>>>>> 7d44697 (errores)
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
import { LoginComponent } from './loging-regis/login.component';
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> 7d44697 (errores)
=======
>>>>>>> ad080d8 (cambios redireciones)
    RouterOutlet,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    LoginComponent
    ],
<<<<<<< HEAD
=======
    LoginComponent,
    RegistroPageComponent, LateralLogin, MenuPrincipalComponent],
>>>>>>> 132bd3f (cambios redireciones)
=======
>>>>>>> 5135880 (cam)
=======
    LoginComponent,
    RegistroPageComponent, LateralLogin, MenuPrincipalComponent],
>>>>>>> 706d3bf (cambios redireciones)
=======
    LoginComponent
    ],
>>>>>>> 17a0d46 (cam)
=======
    LoginComponent, MenuPrincipalComponent],
>>>>>>> ddf09fb (errores)
=======
    RouterOutlet, MenuPrincipalComponent, LoginComponent],
>>>>>>> f7bc1d1 (errores)
=======
    RouterOutlet,
<<<<<<< HEAD
    LoginComponent,
    RegistroPageComponent, LateralLogin, MenuPrincipalComponent],
>>>>>>> 3db7d71 (cambios redireciones)
=======
    LoginComponent
    ],
>>>>>>> 7ef81ac (cam)
  template: `
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  <router-outlet></router-outlet>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 608f0da (redireccionamientos arreglados)
=======
=======
  <app-login></app-login>
>>>>>>> 39e6f1d (Se completo las modificaciones de horario)
>>>>>>> 2d227f3 (Se completo las modificaciones de horario)
=======
>>>>>>> c2af39e (arreglo)
=======
=======
  <app-login></app-login>
  <app-menu-principal></app-menu-principal>
>>>>>>> e1201ee (errores)
<<<<<<< HEAD
>>>>>>> 5838ec7 (errores)
=======
=======
  <app-menu-principal></app-menu-principal>
  <app-login></app-login>
>>>>>>> 4d05ec1 (errores)
<<<<<<< HEAD
>>>>>>> 7d44697 (errores)
=======
=======
  <router-outlet></router-outlet>
>>>>>>> fbce96b (cam)
>>>>>>> 7074a11 (cam)
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

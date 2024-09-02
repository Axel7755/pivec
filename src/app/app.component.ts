import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";
import { LoginComponent } from './loging-regis/login.component';
import { RegistroPageComponent } from "./loging-regis/registro-page.component";
import { LateralLogin } from "./loging-regis/sub-componentes/lateral.component";
import { MenuPrincipalComponent } from "./menu-principal/menu-principal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    LoginComponent,
    RegistroPageComponent, LateralLogin, MenuPrincipalComponent],
  template: `
  <app-menu-principal></app-menu-principal>
  <app-login></app-login>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

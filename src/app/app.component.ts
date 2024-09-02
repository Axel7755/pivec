import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

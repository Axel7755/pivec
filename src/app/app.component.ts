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
    LoginComponent, MenuPrincipalComponent],
  template: `
  <app-login></app-login>
  <app-menu-principal></app-menu-principal>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

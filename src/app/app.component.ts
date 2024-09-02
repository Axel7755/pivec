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
  <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

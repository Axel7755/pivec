import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './loging-regis/login.component';
import { RegistroPageComponent } from "./loging-regis/registro-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    LoginComponent
    , RegistroPageComponent],
  template: `
  <app-login></app-login>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

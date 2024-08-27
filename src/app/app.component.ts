import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LateralLogin } from './loging-regis/lateral.component';
import { LoginFormComponent } from './loging-regis/login-form.component';
//import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,
    //MatToolbarModule,
    MatSidenavModule,
    LateralLogin,
    LoginFormComponent],
  template: `
  <mat-sidenav-container>
    <mat-sidenav opened mode="side">
      <lateral-login>

      </lateral-login>
    </mat-sidenav>
    <mat-sidenav-content class="content">
      <app-login-form></app-login-form>
    </mat-sidenav-content>

  </mat-sidenav-container>
  
  <!--<main class="main"> 
  <div class="content">
  
  <div class="divider" role="separator" aria-label="Divider"></div>
  <app-login-form></app-login-form>

  </div>
</main>-->`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

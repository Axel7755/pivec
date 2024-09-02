import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LateralLogin } from './sub-componentes/lateral.component';
import { LoginFormComponent } from './sub-componentes/login-form.component';
//import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSidenavModule,
    LateralLogin,
    LoginFormComponent,RouterOutlet],
    template: `
    <mat-sidenav-container>
      <mat-sidenav opened mode="side">
        <lateral-login>
  
        </lateral-login>
      </mat-sidenav>
      <mat-sidenav-content class="content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
  
    </mat-sidenav-container>`,
  styleUrl: './login.component.css'
})
export class LoginComponent {

}

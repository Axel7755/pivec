import { Component } from '@angular/core';
import { LateralLogin } from './sub-componentes/lateral.component';
import { LoginFormComponent } from './sub-componentes/login-form.component';
//import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSidenavModule,
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
  
    </mat-sidenav-container>`,
  styleUrl: './login.component.css'
})
export class LoginComponent {

}

import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LateralLogin } from '../lateral.component';
import { LoginFormComponent } from '../login-form.component';

@Component({
  selector: 'app-verificar-datos',
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
  styleUrl: './verificar-datos.component.css'
})
export class VerificarDatosComponent {

}
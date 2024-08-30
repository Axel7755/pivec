import { Component } from '@angular/core';
import { LateralLogin } from './sub-componentes/lateral.component';
import { RegistroComponent } from './sub-componentes/registro.component';
//import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-registro-page',
  standalone: true,
  imports: [MatSidenavModule,
    LateralLogin,
    RegistroComponent],
    template: `
    <mat-sidenav-container>
      <mat-sidenav opened mode="side">
        <lateral-login>
  
        </lateral-login>
      </mat-sidenav>
      <mat-sidenav-content class="content">
        <app-registro></app-registro>
      </mat-sidenav-content>
  
    </mat-sidenav-container>`,
  styleUrl: './registro-page.component.css'
})
export class RegistroPageComponent {

}

import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'

@Component({
  selector: 'app-menu-principal',
  standalone: true,
  imports: [MatSidenavModule],
  template: `
    <mat-sidenav-container>
      <mat-sidenav opened mode="side">
        
      </mat-sidenav>
      <mat-sidenav-content class="content">
        
      </mat-sidenav-content>
  
    </mat-sidenav-container>`,
  styleUrl: './menu-principal.component.css'
})
export class MenuPrincipalComponent {

}

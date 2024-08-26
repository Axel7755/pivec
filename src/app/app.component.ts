import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LateralLogin} from './loging-regis/lateral.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LateralLogin],
  template: `<main class="main">   
  <div class="content">
  <lateral-login></lateral-login>
  <div class="divider" role="separator" aria-label="Divider"></div>

  </div>
</main>`,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pivec';
}

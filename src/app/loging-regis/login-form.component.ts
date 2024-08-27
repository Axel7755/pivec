import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  //title = 'pivec';
}

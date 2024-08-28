import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,MatIconModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  //title = 'pivec';
}

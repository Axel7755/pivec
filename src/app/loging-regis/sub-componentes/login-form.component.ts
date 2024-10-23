import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { FormControl,FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,
    MatIconModule, RouterLink,FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  formReg = new FormGroup({
    identificador: new FormControl(''),
    contraseña: new FormControl(''),
  })

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion() {
    var identificador = this.formReg.value.identificador ?? '';
    var contraseña = this.formReg.value.contraseña ?? '';
    this.authService.login(identificador, contraseña).subscribe(response => {
      if (response) {
        // Almacenar el token si el login es exitoso
        localStorage.setItem('user', JSON.stringify(response));
        console.log('Inicio de sesión exitoso');
        
      } else {
        console.error('Error en las credenciales');
      }
    });
  }
  //title = 'pivec';
}

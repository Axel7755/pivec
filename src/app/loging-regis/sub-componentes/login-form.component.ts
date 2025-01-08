import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { FormControl, Validators, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, merge, of } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule,
    MatIconModule, RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {

  formReg = new FormGroup({
    identificador: new FormControl(''),
    contraseña: new FormControl(''),
  })

  formRec = new FormGroup({
    recCorreo: new FormControl('', [Validators.required, Validators.email]),
  })

  errorMessage = '';
  mostrarCampoCorreo = false; // Muestra el campo al cargar la página

  constructor(private authService: AuthService, private router: Router,
  ) {
    merge(this.formRec.controls.recCorreo.statusChanges, this.formRec.controls.recCorreo.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  iniciarSesion() {
    var identificador = this.formReg.value.identificador ?? '';
    var contraseña = this.formReg.value.contraseña ?? '';
    this.authService.login(identificador, contraseña).subscribe(response => {
      if (response) {
        localStorage.setItem('user', JSON.stringify(response));
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/menu-principal/materias']); // Redirigir al usuario a la página de inicio o a otro lugar
      } else {
        console.error('Error en las credenciales');
        alert('Error en las credenciales');
      }
    }, error => {
      console.error('Error al conectar con el servidor', error);
      alert('Error al conectar con el servidor');
    });
  }
  //title = 'pivec';

  // Secciones de recuperar contraseña

  toggleOlvideContrasena() {
    this.mostrarCampoCorreo = !this.mostrarCampoCorreo;
  }

  recuperarContrasena() {
    const correo = this.formRec.value.recCorreo ?? '';
    this.authService.sendResetEmail(correo).pipe(
      catchError(this.handleError)
    ).subscribe(correoData => {
      if(correoData){
        alert('Correo enviado');
      }
    })
    // Lógica para enviar el correo de recuperación
  }

  // Validación de correo
  updateErrorMessage() {
    if (this.formRec.controls.recCorreo.hasError('required')) {
      this.errorMessage = 'Ingrese un valor';
    } else if (this.formRec.controls.recCorreo.hasError('email')) {
      this.errorMessage = 'No es un email valido';
    } else {
      this.errorMessage = '';
    }
  }


 private handleError(error: any) {
    console.error('Error:', error);
    alert('Ocurrió un error correo no encontrado. Por favor, inténtelo de nuevo');
    return of(null);
  }

}

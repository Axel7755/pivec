import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { catchError, merge, of } from 'rxjs';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { AuthService } from '../servicios/auth.service';


@Component({
  selector: 'app-restablecer-password',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './restablecer-password.component.html',
  styleUrls: ['./restablecer-password.component.css'],
  host: { 'ngSkipHydration': '' }
})
export class RestablecerPasswordComponent implements OnInit {


  ident: string | null = null;
  token: string | null = null;

  errorMessageCont = '';
  errorMessageConfCont = '';
  // Validator to check if the passwords match

  passwordMatchValidator: ValidatorFn = (form: AbstractControl) => {
    const password = form.get('contr')?.value;
    const confirmPassword = form.get('confcontr')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { 'mismatch': true };
  };

  // FormGroup for managing the form state
  formReg = new FormGroup({
    contr: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._\-~`!@#$%^&*()+=<>?,:;{}[\]|\\/])[A-Za-z\d@$!%*?&.#._\-~`!@#$%^&*()+=<>?,:;{}[\]|\\/]{8,}$/)
    ]),
    confcontr: new FormControl('',  [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#._\-~`!@#$%^&*()+=<>?,:;{}[\]|\\/])[A-Za-z\d@$!%*?&.#._\-~`!@#$%^&*()+=<>?,:;{}[\]|\\/]{8,}$/)
    ]),
  },{ validators: this.passwordMatchValidator });

  constructor(private router: Router, public dialog: MatDialog,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { merge(this.formReg.controls.contr.statusChanges, this.formReg.controls.contr.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessageCont());
  
        merge(this.formReg.controls.confcontr.statusChanges, this.formReg.controls.confcontr.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessageConfCont());}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ident = params['ident'];
      this.token = params['token'];
    }
    )
  }

  updateErrorMessageCont() {
    if (this.formReg.controls.contr.hasError('required')) {
      this.errorMessageCont = 'La contraseña es obligatoria.';
    } else if (this.formReg.controls.contr.hasError('minlength')) {
      this.errorMessageCont = 'Mínimo 8 caracteres.';
    } else if(this.formReg.controls.contr.hasError('pattern')){
      this.errorMessageCont = 'Debe incluir una mayúscula, un número y un carácter especial.';
    } else {
      this.errorMessageCont = '';
    }
  }

  updateErrorMessageConfCont() {
    if (this.formReg.controls.confcontr.hasError('required')) {
      this.errorMessageConfCont = 'La contraseña es obligatoria.';
    } else if (this.formReg.controls.confcontr.hasError('minlength')) {
      this.errorMessageConfCont = 'Mínimo 8 caracteres.';
    } else if(this.formReg.controls.confcontr.hasError('pattern')){
      this.errorMessageConfCont = 'Debe incluir una mayúscula, un número y un carácter especial.';
    } else if(this.formReg.hasError('mismatch')){
      this.errorMessageConfCont = 'Las contraseñas no coinciden.';
    } else {
      this.errorMessageConfCont = '';
    }
  }
  // Method to handle password recovery
  recuperarContrasena() {
    if (this.formReg.valid) {
      if (this.formReg.value.contr !== this.formReg.value.confcontr) {
        console.log("contraseñas diferentes");
        this.openDialogError();
      } else {
        console.log(this.ident);
        console.log(this.token);
        console.log(this.formReg.value.contr!);
        this.authService.resetPassword(this.ident!, this.token!, this.formReg.value.contr!).pipe(
          catchError(this.handleError)
        ).subscribe(recContData => {
          if(recContData){
            this.openDialog();
          }
        })
        
      }
      // Lógica para manejar la recuperación de la contraseña (por ejemplo, llamar a un servicio)
      //this.router.navigate(['login/login-component']);
    }
  }
  private handleError(error: any) {
    console.error('Error:', error);
    alert("token expirado");
    //alert('Ocurrió un error. Por favor, inténtelo de nuevo.');
    return of(null);
  }

  openDialogError() {
    this.dialog.open(DialogElementsExampleDialogError);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //this.router.navigate(['login/login-component']); // Reemplaza '/login' con la ruta real de tu página de inicio de sesión
      }
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {
  constructor(private router: Router) { }
  irLogin() {
    this.router.navigate(['login/login-component']);
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-contError.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
})
export class DialogElementsExampleDialogError { }


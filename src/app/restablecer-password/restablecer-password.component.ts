import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-restablecer-password',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './restablecer-password.component.html',
  styleUrls: ['./restablecer-password.component.css'],
  host: { 'ngSkipHydration': '' }
})
export class RestablecerPasswordComponent {

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
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    confcontr: new FormControl('', Validators.required)
  }, { validators: this.passwordMatchValidator });

  constructor(private router: Router) { }

  // Method to handle password recovery
  recuperarContrasena() {
    if (this.formReg.valid) {
      // Logic to handle password recovery (e.g., call a service)
      this.router.navigate(['login/login-component']);
    }
  }

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['login/login-component']); // Reemplaza '/login' con la ruta real de tu página de inicio de sesión
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

}

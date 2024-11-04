import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SubirArchivosComponent } from '../subir-archivos/subir-archivos.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-crear-tareas-d',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './crear-tareas-d.component.html',
  styleUrl: './crear-tareas-d.component.css',
  host: { 'ngSkipHydration': '' }

})
export class CrearTareasDComponent implements AfterViewInit {

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(SubirArchivosComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  @ViewChild('fechaVencimiento') fechaVencimiento!: ElementRef<HTMLInputElement>;
  @ViewChild('validationMessage') validationMessage!: ElementRef<HTMLDivElement>;

  ngAfterViewInit() {
    const input = this.fechaVencimiento.nativeElement;
    const validationMessage = this.validationMessage.nativeElement;

    // Escucha el evento de entrada en el campo
    input.addEventListener('input', () => {
      const currentDate = new Date();
      if (input.validity.valid && new Date(input.value) > currentDate) {
        validationMessage.style.display = 'none'; // Oculta el mensaje de validación
      } else {
        validationMessage.style.display = 'block'; // Muestra el mensaje de validación
      }
    });

    // Establecer el valor de input a la fecha actual
    const currentDate = new Date();
    input.value = currentDate.toISOString().slice(0, 16); // Establece el valor en formato datetime-local
  }
}
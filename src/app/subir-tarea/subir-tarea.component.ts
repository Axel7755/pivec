import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { SubirArchivosComponent } from '../subir-archivos/subir-archivos.component';

@Component({
  selector: 'app-subir-tarea',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './subir-tarea.component.html',
  styleUrl: './subir-tarea.component.css',
  host: { 'ngSkipHydration': '' }

})
export class SubirTareaComponent {

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(SubirArchivosComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

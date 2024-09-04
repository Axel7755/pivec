import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-materias',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './materias.component.html',
  styleUrl: './materias.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MateriasComponent {

}

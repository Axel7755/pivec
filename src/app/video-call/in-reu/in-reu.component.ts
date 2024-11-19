import { Component } from '@angular/core';

@Component({
  selector: 'app-in-reu',
  standalone: true,
  imports: [],
  templateUrl: './in-reu.component.html',
  styleUrl: './in-reu.component.css'
})
export class InReuComponent {

  navigateToPage(): void {
    window.location.href = 'https://example.com'; // Reemplaza con la URL a la que quieres redirigir
  }


}

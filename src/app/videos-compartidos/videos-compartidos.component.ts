import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-videos-compartidos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './videos-compartidos.component.html',
  styleUrl: './videos-compartidos.component.css'
})
export class VideosCompartidosComponent implements OnInit {
  truncatedContent: string = '';

  // Texto original para las tarjetas
  content: string = 'Un video reciente sobre liderazgo personal destaca 7 aspectos clave para desarrollar esta habilidad. El enfoque principal está en cómo convertirte en tu propio líder mediante el autoconocimiento, la disciplina y la toma de decisiones responsables.';

  ngOnInit() {
    this.truncatedContent = this.truncateText(this.content, 160);
  }

  truncateText(text: string, maxChars: number): string {
    return text.length > maxChars ? text.substring(0, maxChars) + '...' : text;
  }
}
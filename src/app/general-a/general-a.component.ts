// general-a.component.ts (y aplicable a cualquier subcomponente)
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-a',
  standalone: true,
  templateUrl: './general-a.component.html',
  styleUrls: ['./general-a.component.css']
})
export class GeneralAComponent implements OnInit {
  idgrupos: string | null = null;
  g_idmaterias: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Usa `parent` para acceder a los parámetros de `menu-materia`
    this.route.parent?.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];
      console.log('ID de grupo:', this.idgrupos);
      console.log('ID de materia:', this.g_idmaterias);
    });
  }
}

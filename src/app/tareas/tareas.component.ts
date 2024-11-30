import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from '../servicios/tareas.service';
import { DocentesService } from '../servicios/docentes.service';
import { EntregasService } from '../servicios/entregas.service';
import { AuthService } from '../servicios/auth.service';
import { GruposService } from '../servicios/grupos.service';

interface TareaConEntregaG {
  tarea: any;
  entrega: any;
}

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css'
})

export class TareasComponent implements OnInit {
  idgrupos: string | null = null;
  g_idmaterias: string | null = null;
  grupo: any;
  userId: string | null = null;
  docente: any;
  estado: number = 0;
  visualizar: any[] = [];
  tareasp: any[] = [];
  entregadas: any[] = [];
  vencidas: any[] = [];
  entregas: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tareasService: TareasService,
    private docentesService: DocentesService,
    private entregasService: EntregasService,
    private authService: AuthService,
    private gruposService: GruposService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.route.parent?.params.subscribe(params => {
      this.idgrupos = params['idgrupos'];
      this.g_idmaterias = params['g_idmaterias'];

    });

  }

}

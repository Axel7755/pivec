import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { MateriasService } from '../../servicios/materias.service';
import { ClockService } from '../../servicios/clock.service';
import { forkJoin, of, catchError, switchMap } from 'rxjs';


@Component({
  selector: 'app-in-reu',
  standalone: true,
  imports: [],
  templateUrl: './in-reu.component.html',
  styleUrl: './in-reu.component.css'
})
export class InReuComponent implements OnInit {
  roomId: string = '3cm2-2-2023';
  idmat = '';
  idgrupo  = ''
  material = 'Liderazgo';

  constructor(private router: Router,
    private materasService: MateriasService,
    private clockService: ClockService
  ) {

  }

  ngOnInit(): void {
    this.clockService.getIds().pipe(
      switchMap(ids => {
        this.idmat = ids.idmat;
        //this.idgrupo = ids.idgrupo;
        this.roomId = `${ids.idmat}-${ids.idgrupo}`
  
        return forkJoin([
          this.materasService.findMateriaById(this.idmat).pipe(
            catchError(this.handleError)
          )
        ]);
      })
    ).subscribe(([materiaData]: [any]) => {
      if (materiaData) {
        //console.log(materiaData);
        this.material = materiaData.material;
      }
    });
  }
  

  goToRoom = () => {
    //aqui deve de ir el id de el grupo que tendra la clase
    //this.router.navigate(['room/', uuidv4()]);
    this.router.navigate(['room/', this.roomId]);
  }

   private handleError(error: any) {
      console.error('Error:', error);
      //alert('Ocurrió un error. Por favor, inténtelo de nuevo.');
      return of(null);
    }

}

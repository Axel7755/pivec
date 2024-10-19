import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RegistroData {
  nombre: string;
  boleta: string;
  conthash: string;
  correo: string; 
  materias: { [key: number]: string };
  grupos: { [key: number]: string };
  docentes: { [key: number]: string };
  lunes: { [key: number]: string };
  martes: { [key: number]: string };
  miercoles: { [key: number]: string };
  jueves: { [key: number]: string };
  viernes: { [key: number]: string };
}

@Injectable({
  providedIn: 'root'
})
export class RegistroDataService {

  private dataSource = new BehaviorSubject<RegistroData>
  ({ 
    nombre: '',
    boleta: '',
    conthash: '',
    correo: '',
    materias: {},
    docentes: {},
    grupos :{},
    lunes: {},
    martes: {},
    miercoles: {},
    jueves: {},
    viernes: {}
  });
  currentData = this.dataSource.asObservable();

  changeData(data: RegistroData) {
    this.dataSource.next(data);
  }

  constructor() { }
}

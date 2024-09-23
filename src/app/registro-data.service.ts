import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface RegistroData {
  nombre: string;
  boleta: string;
  conthash: string;
  materia: string[];
  profesor: string[];
  lunes: string[];
  martes: string[];
  miercoles: string[];
  jueves: string[];
  viernes: string[];
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
    materia: [],
    profesor: [],
    lunes: [],
    martes: [],
    miercoles: [],
    jueves: [],
    viernes: []
  });
  currentData = this.dataSource.asObservable();

  changeData(data: RegistroData) {
    this.dataSource.next(data);
  }

  constructor() { }
}

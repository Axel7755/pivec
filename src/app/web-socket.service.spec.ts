import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: any;

  constructor() {
    this.socket = io(`${environment.apiUrl}:8080`, {  // Aquí estaba el error, el apóstrofo de cierre debería ser después de la coma
      secure: true,
      transports: ['websocket', 'polling']
    });
  }

  // Métodos para manejar eventos del socket
}

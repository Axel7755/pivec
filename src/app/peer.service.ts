import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  peer: any;

  constructor() {
    this.peer = new Peer({
      host: environment.apiUrl.replace(/^https?:\/\//, ''), // Remover 'http://' si está presente
      port: 8080,
      path: '/peer',
      secure: false  // Asegúrate de que está configurado para HTTPS
    });
  }
}


import { Injectable } from '@angular/core';
import Peer from 'peerjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  peer: any;

  constructor() {
    const peerOptions = {
      host: environment.apiUrl.replace(/^https?:\/\//, ''), // Remover 'http://' si está presente
      port: 3001,
      path: '/',
      secure: true,  // Asegúrate de que esté configurado para HTTPS
      ssl: {
        key: '/home/axel1021/Escritorio/PIVEC/pivec//key.pem',
        cert: '/home/axel1021/Escritorio/PIVEC/pivec//cert.pem'
      }
    };

    this.peer = new Peer(peerOptions);
  }
}
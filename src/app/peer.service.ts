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
      host: 'localhost', // Remover 'http://' si está presente
      port: 3001
    });
  }
}

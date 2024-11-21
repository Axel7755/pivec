import { Injectable } from '@angular/core';
import Peer from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class PeerService {
  peer: any;

  constructor() {
    // Aqui se puede establecer un id en especifico,
    this.peer = new Peer('', {
      host: 'localhost',
      port: 3001
    });
  }
}

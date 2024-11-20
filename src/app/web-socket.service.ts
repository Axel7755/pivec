import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { EventEmitter } from 'stream';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: { withCredentials: true } };

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  // un evento => un user nuevo se conecte o cuando un user se desconecte
  events = ['new-user', 'bye-user'];
  cbEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private socket: Socket) {
    this.listener();
  }

  listener = () => {
    this.events.forEach(eventName => {
      this.socket.on(eventName, (data: any) => {
        this.cbEvent.emit({
          name: eventName,
          data
        });
      });
    });
  };


  joinRoom = (data: any) => {
    this.socket.emit('join', data);
  }

}

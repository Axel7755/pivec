import {EventEmitter, Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  events = ['new-user', 'bye-user'];
  cbEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(public socket: Socket) {
    this.listener();
  }

  listener = () => {
    this.events.forEach(evenName => {
      this.socket.on(evenName, (data: any) => this.cbEvent.emit({
        name: evenName,
        data
      }));
    });
  };

  sendMesage = (myName:string, text:string) => {

    this.socket.emit("messagesend", `${myName} : ${text}`);
    //console.log("en socket service",text)
  }

  joinRoom = (data: any) => {
    this.socket.emit('join', data);
  }
  onCreateMessage(callback: (message: string) => void) { 
    this.socket.on("createMessage", (message: string) => { 
      callback(message); 
    }); 
  }
}
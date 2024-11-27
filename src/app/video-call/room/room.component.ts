import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebSocketService } from '../../web-socket.service';
import { PeerService } from '../../peer.service';

import { CommonModule } from '@angular/common';
import { MenuBottomComponent } from "../../components/menu-bottom/menu-bottom.component";
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [MenuBottomComponent, CommonModule, VideoPlayerComponent],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomName: string;
  currentStream: any;
  listUser: Array<any> = [];

  constructor(private route: ActivatedRoute, private webSocketService: WebSocketService,
    private peerService: PeerService) {
    this.roomName = this.route.snapshot.paramMap.get('id')!;
    console.log('---> Room name: ', this.roomName);
  }

  ngOnInit(): void {
    this.checkMediaDevices();
    this.initPeer();
    this.initSocket();
  }

  initPeer = () => {
    const { peer } = this.peerService;
    peer.on('open', (id: string) => {
      console.log('ID PEER:', id);

      const body = {
        idPeer: id,
        roomName: this.roomName
      };
      this.webSocketService.joinRoom(body);
    });

    peer.on('call', (callEnter: any) => {
      callEnter.answer(this.currentStream);
      callEnter.on('stream', (streamRemote: any) => {
        // this.addVideoUser(streamRemote);
      });
    });

    peer.on('error', (err: any) => {
      console.error('*** ERROR *** Peer call ', err);
    });
  }

  initSocket = () => {
    this.webSocketService.cbEvent.subscribe(res => {
      console.log('SOCKET', res);
    });
  }

  checkMediaDevices = () => {
    if (navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then(stream => {
        this.currentStream = stream;
        this.addVideoUser(stream);
      }).catch(() => {
        console.log('*** ERROR *** Not permissions');
      });
    } else {
      console.log('*** ERROR *** Not media devices');
    }
  }

  addVideoUser = (stream: any) => {
    this.listUser.push(stream);
  }
}

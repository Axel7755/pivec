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
    //this.checkMediaDevices()
    this.initPeer();
    this.sendCall();
    //this.initSocket();
  }

  initPeer = () => {
    const { peer } = this.peerService;
    peer.on('open', (id: any) => {
      const body = {
        idPeer: id,
        roomName: this.roomName
      };
      console.log("se inicializa peer")
      this.webSocketService.joinRoom(body);
    });


    peer.on("call", (call: any) => {
      console.log("en caso de llamada answer")
      navigator.mediaDevices.getUserMedia(
        { video: true, audio: true },
      ).then((stream: any,) => {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on("stream", (remoteStream: any) => {
          this.currentStream = stream;
          this.addVideoUser(remoteStream);
        });
      },
        (err) => {
          console.error("Failed to get local stream", err);
        },)
    });
  }

  addVideoUser = (stream: any) => {
    this.listUser.push(stream);
    const unique = new Set(this.listUser);
    this.listUser = [...unique];
  }

  sendCall = () => {
    console.log("sendcallprimero")
    navigator.mediaDevices.getUserMedia(
      { video: true, audio: true },
    ).then(
      (stream) => {
        this.addVideoUser(stream);
        this.webSocketService.cbEvent.subscribe(res => {
          console.log('SOCKET', res);
          if (res.name === 'new-user') {
            const { idPeer } = res.data;
            console.log('current stream', stream);
            const call = this.peerService.peer.call(idPeer, stream);
            call.on("stream", (remoteStream: any) => {
              this.addVideoUser(remoteStream);
            });
          }
        });
      },
      (err) => {
        console.error("Failed to get local stream", err);
      }
    )
  }
}

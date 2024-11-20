import { Component, Input, OnInit } from '@angular/core';
import { MenuBottomComponent } from "../../components/menu-bottom/menu-bottom.component";
import { ActivatedRoute } from '@angular/router';
import { PeerService } from '../../peer.service';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [MenuBottomComponent, CommonModule, VideoPlayerComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent implements OnInit {

  currentStream: any;
  listUser: Array<any> = [];

  constructor() {
  }

  ngOnInit(): void {
    this.checkMediaDevices();
  }

  checkMediaDevices = () => {
    if (typeof window !== 'undefined' && navigator && navigator.mediaDevices) {
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
      }).then(stream => {
        this.currentStream = stream;
        this.addVideoUser(stream);
      }).catch(() => {
        console.error('*** ERROR *** Sin permisos para acceder a dispositivos multimedia');
      });
    } else {
      console.error('*** ERROR *** No son dispositivos multimedia o no se ejecuta en el cliente');
    }
  }


  addVideoUser = (stream: any) => {
    this.listUser.push(stream);
  }


}
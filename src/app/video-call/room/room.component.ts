import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketService } from '../../web-socket.service';
import { PeerService } from '../../peer.service';
import { CommonModule } from '@angular/common';
import { VideoPlayerComponent } from '../../components/video-player/video-player.component';
import { AuthService } from '../../servicios/auth.service';
import { DocentesService } from '../../servicios/docentes.service';
import { AlumnosService } from '../../servicios/alumnos.service';
import { catchError, of, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { SubirArchivosService } from '../../subir-archivos/subir-archivos.service';
import { ClockService } from '../../servicios/clock.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, MatIconModule],
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit, AfterViewInit, OnDestroy {
  roomName: string;
  currentStream: any;
  displayStream: any;
  listUser: Array<any> = [];
  listUser2: Array<{ idPeer: string, stream: MediaStream, nombre: string }> = [];
  userId: string | null = null;
  isDocente: boolean = false;
  myname: string = 'usuario';
  chat: HTMLElement | null = null;
  chatInput: HTMLInputElement | null = null;
  main__chat__window: HTMLElement | null = null;
  mainChatWindow: HTMLElement | null = null;
  mediaRecorder: any;
  recordedChunks: any = [];
  isRecording: boolean = false;
  private socketSub: Subscription = new Subscription();
  isChatHidden: boolean = false;
  grabacion: File | null = null;
  idgrupo = '';
  idmat = '';

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService,
    private peerService: PeerService,
    private authService: AuthService,
    private docentesService: DocentesService,
    private alumnosService: AlumnosService,
    private router: Router,
    private subriArchivosService: SubirArchivosService,
    private clockService: ClockService,
  ) {
    this.roomName = this.route.snapshot.paramMap.get('id')!;
    console.log('---> Room name: ', this.roomName);
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.isDocente = this.authService.getUserRole() === 'docente';

    this.clockService.getIds().subscribe(ids => {
      this.idmat = ids.idmat;
      this.idgrupo = ids.idgrupo;
    });

    if (this.isDocente) {
      this.docentesService.obtenerDocente(this.userId).pipe(
        catchError(error => {
          console.error('Error al recuperar docente', error);
          alert('Error al recuperar docente');
          return of(null);
        })
      ).subscribe(docenteData => {
        if (docenteData) {
          this.myname = `${docenteData.apellidoP_Do} ${docenteData.nombres_Do} ${docenteData.apellidoM_Do}`;
        }
      });
      this.recordCall();
    } else {
      this.alumnosService.obtenerAlumno(this.userId).pipe(
        catchError(error => {
          console.error('Error al recuperar alumno', error);
          alert('Error al recuperar alumno');
          return of(null);
        })
      ).subscribe(AlumnoData => {
        if (AlumnoData) {
          this.myname = `${AlumnoData.apellidoP_Al} ${AlumnoData.nombres_Al} ${AlumnoData.apellidoM_Al}`;
        }
      });
    }

    this.initPeer();
    this.sendCall();
    // Suscribirse al evento de mensaje del socket 
    this.webSocketService.socket.on("createMessage", (message: string) => {
      this.addMessageToChat(message);
      console.log(message)
    });
  }

  ngAfterViewInit(): void {
    this.chat = document.getElementById("chat");
    this.chatInput = document.getElementById("chat_message") as HTMLInputElement;
    this.main__chat__window = document.getElementById("main__chat_window") as HTMLElement;
    this.mainChatWindow = document.querySelector(".main__message_container") as HTMLElement;

    if (this.chatInput) {
      this.chatInput.addEventListener("keydown", (event: KeyboardEvent) => this.sendMessage(event));
    }
    if (this.chat) {
      this.chat.hidden = true;
    }
  }

  ngOnDestroy(): void {
    this.socketSub.unsubscribe();
  }

  initPeer = () => {
    const { peer } = this.peerService;
    peer.on('open', (id: any) => {
      const body = {
        idPeer: id,
        roomName: this.roomName
      };
      console.log("se inicializa peer");
      this.webSocketService.joinRoom(body);
    });

    peer.on("call", (call: any) => {
      console.log("en caso de llamada answer");
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream: any) => {
          call.answer(stream);
          call.on("stream", (remoteStream: any) => {
            this.currentStream = stream;
            this.addVideoUser(remoteStream);
          });
        })
        .catch((err) => {
          console.error("Failed to get local stream", err);
        });
    });
  }

  addVideoUser = (stream: any) => {
    this.listUser.push(stream);
    const unique = new Set(this.listUser);
    this.listUser = [...unique];
  }

  removeVideoUser = (idpeer: any) => {
    this.listUser = this.listUser.filter(userStream => userStream.id !== idpeer);
    const unique = new Set(this.listUser);
    this.listUser = [...unique];
  }

  sendCall = () => {
    console.log("sendcallprimero");

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          this.currentStream = stream;
          this.addVideoUser(stream);
          this.socketSub = this.webSocketService.cbEvent.subscribe(res => {
            console.log('SOCKET', res);
            if (res.name === 'new-user') {
              const { idPeer } = res.data;
              console.log('current stream', stream);
              const call = this.peerService.peer.call(idPeer, stream);
              call.on("stream", (remoteStream: any) => {
                this.addVideoUser(remoteStream);
              });
            }
            if (res.name === 'bye-user') {
              const { idPeer } = res.data;
              console.log('User disconnected', idPeer);
              // Encontrar el stream del usuario desconectado y eliminarlo 

              this.removeVideoUser(idPeer);
            }
          });
        })
        .catch((err) => {
          console.error("Failed to get local stream", err);
        });
    } else {
      console.error("getUserMedia is not supported in this browser");
    }
  }

  irPaginaInicial() {
    // Detener todas las pistas de video y audio
    if (this.currentStream) {
      this.currentStream.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop();
      });
    }
    if(this.isRecording){
      this.stopRecording();
    }

    // Navegar a la página principal
    this.router.navigate(['/menu-principal/materias']);
  }


  shareDisplay = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
        .then((stream) => {
          this.displayStream = stream;
          this.addVideoUser(stream);
          this.socketSub = this.webSocketService.cbEvent.subscribe(res => {
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
        })
        .catch((err) => {
          console.error("Failed to get display media", err);
        });
    } else {
      console.error("getDisplayMedia is not supported in this browser");
    }
  }

  recordCall = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      try {
        // Obtén el flujo de video y audio del sistema
        const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

        // Obtén el flujo de audio del micrófono
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // Combina ambos flujos en uno
        const combinedStream = new MediaStream([
          ...displayStream.getVideoTracks(),
          ...displayStream.getAudioTracks(),
          ...audioStream.getAudioTracks(),
        ]);

        // Configura la grabadora
        this.mediaRecorder = new MediaRecorder(combinedStream);
        this.recordedChunks = [];

        this.mediaRecorder.ondataavailable = (event: any) => {
          if (event.data.size > 0) {
            this.recordedChunks.push(event.data);
          }
        };

        this.mediaRecorder.onstop = () => {
          const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
          if (this.isDocente) {
            const currentDate = new Date();
            const formattedDate = currentDate.toLocaleDateString('es-ES').replace(/\//g, '-') + ' - ' + currentDate.toLocaleTimeString('es-ES').replace(/:/g, '-');
            const file = new File([blob], `${formattedDate}.webm`, { type: 'video/webm' });
            console.log('Archivo grabado:', file);
            this.subriArchivosService.uploadGrabacion(file, this.idgrupo, this.idmat).pipe(
              catchError(error => {
                console.error('Error al subir el archivo:', error);
                return of(null);
              })
            ).subscribe(
              event => {
                if (event) {
                  if (event.type === HttpEventType.UploadProgress) {
                    // Puedes manejar el progreso de la subida aquí si lo deseas
                  } else if (event instanceof HttpResponse) {
                    console.log('Archivo subido exitosamente');
                  }
                }
              }
            );
          } else {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${new Date()}.webm`;
            document.body.appendChild(a);
            a.click();
            URL.revokeObjectURL(url);
          }
        };

        this.mediaRecorder.start();
        this.isRecording = true;
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    } else {
      console.error("getDisplayMedia is not supported in this browser");
    }
  };

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
      this.isRecording = false;
      // Llamar al método de servicio para subir la grabación
    }
  }


  toggleRecording() { if (this.isRecording) { this.stopRecording(); } else { this.recordCall(); } }

  addMessageToChat = (message: string) => {
    const ul = document.getElementById("messageadd");
    if (ul) {
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(message));
      li.className = "message";
      ul.appendChild(li);
    }
  }

  muteUnmute = () => {
    const enabled = this.currentStream.getAudioTracks()[0].enabled;
    if (enabled) {
      this.currentStream.getAudioTracks()[0].enabled = false;
      document.getElementById("mic")!.style.color = "red";
    } else {
      document.getElementById("mic")!.style.color = "white";
      this.currentStream.getAudioTracks()[0].enabled = true;
    }
  }

  VideomuteUnmute = () => {
    const enabled = this.currentStream.getVideoTracks()[0].enabled;
    if (enabled) {
      this.currentStream.getVideoTracks()[0].enabled = false;
      document.getElementById("video")!.style.color = "red";
    } else {
      document.getElementById("video")!.style.color = "white";
      this.currentStream.getVideoTracks()[0].enabled = true;
    }
  }

  showchat = () => {
    if (this.chat) {
      this.chat.hidden = !this.chat.hidden;
    }
  }

  toggleChat(): void {
    this.isChatHidden = !this.isChatHidden;
  }
  sendMessage = (event: KeyboardEvent) => {
    if (this.chatInput && this.main__chat__window) {
      const text = this.chatInput.value;
      if (event.key === "Enter" && text !== "") {
        this.webSocketService.sendMesage(this.myname, text);
        this.chatInput.value = "";
        this.main__chat__window.scrollTop = this.main__chat__window.scrollHeight;
      }
    }
  }
}

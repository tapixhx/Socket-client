import { Injectable } from '@angular/core';
// import * as io from 'socket.io-client/build/index';
import {io} from 'socket.io-client/build/index';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket = io('http://localhost:3000/');
  // socket;
  constructor() { }

  setupSocketConnection() {
    // this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('message', 'Hello there from Angular.');
    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });

  }

  joinRoom(data) {
    console.log(data);
    this.socket.emit('join', data);
  }

  newUserJoined() {
    let observable = new Observable<{user: String, message: String}>(observer => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }

  leaveRoom(data) {
    console.log(data);
    this.socket.emit('leave', data);
  }

  userLeftRoom() {
    let observable = new Observable<{user: String, message: String}>(observer => {
      this.socket.on('left room', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }

  sendMessage(data) {
    console.log(data);
    this.socket.emit('message', data);
  }

  newMessageRecieved() {
    let observable = new Observable<{user: String, message: String}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {this.socket.disconnect();}
    });
    return observable;
  }

}

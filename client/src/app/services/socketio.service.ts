import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private conUrl = 'http://localhost:3000';

  socket;

  constructor() { }

  setupSocketConnection() {
    console.log('connection');
    this.socket = io(this.conUrl);
    this.socket.emit('my message', 'Hello there from Angular.');
  }

}

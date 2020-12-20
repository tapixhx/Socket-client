import { Component, OnInit } from '@angular/core';

import { SocketioService } from './services/socketio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';

  user:String;
  room:String;
  messageText:any;
  messageArray:Array<{user:String, message:String}> = [];

  constructor(private socketService: SocketioService) {

    this.socketService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));

    this.socketService.userLeftRoom()
      .subscribe(data => this.messageArray.push(data));

    this.socketService.newMessageRecieved()
      .subscribe((data) => {
        this.messageArray.push(data);
        console.log(this.messageArray);
      });
  }

  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  join() {
    this.socketService.joinRoom({user:this.user, room:this.room});
  }

  leave() {
    this.socketService.leaveRoom({user:this.user, room:this.room});
  }

  send() {
    this.socketService.sendMessage({user:this.user, room:this.room, message:this.messageText});
  }

}

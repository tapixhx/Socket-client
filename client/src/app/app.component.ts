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
  messageArray:Array<{user:String, message:String}> = [];

  constructor(private socketService: SocketioService) {
    this.socketService.newUserJoined()
      .subscribe(data => this.messageArray.push(data));
  }

  ngOnInit() {
    this.socketService.setupSocketConnection();
  }

  join() {
    this.socketService.joinRoom({user:this.user, room:this.room});
  }

}

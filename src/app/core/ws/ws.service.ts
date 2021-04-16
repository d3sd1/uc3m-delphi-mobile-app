import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {SessionStorageService} from '../session-storage.service';
import {UserStorage} from '../storage/user.storage';
import {BehaviorSubject} from 'rxjs';
import {User} from '../../logged-in/user';
import {ChatMessage} from '../../../model/chat-message';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private stompClient: Stomp = null;


  constructor() {
  }

  async connectWs(jwt: string) {
    let ws = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({jwt: jwt}, (frame) => {
      this.stompClient.subscribe('/ws/topic/greetings', (message) => {
        console.log('recved msg ', message);
      });
      //_this.stompClient.reconnect_delay = 2000;
    }, (e) => {
      console.error('eee', e);
    });
  }

  async publish(channel: string, body: any) {
    this.stompClient.send('/ws/publisher/' + channel, {}, JSON.stringify(body)); // stringfify?
  }

  subscribe(channel: string, privateChannel: boolean): BehaviorSubject<any> {
    const dataTransfer = new BehaviorSubject<ChatMessage>(null);
    this.stompClient.subscribe((privateChannel ? '/private' : '') + '/ws/subscribe/' + channel, (message) => {
      dataTransfer.next(JSON.parse(message.body));
    });
    //TODO FUTURE: handle unsubcriptions
    //TODO FUTURE: re-structure chat system =)
    return dataTransfer;
  }

  async disconnectWs() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    this.stompClient = null;
  }

}

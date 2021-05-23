import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private stompClient: Stomp = null;

  constructor() {
  }

  async connectWs(jwt: string) {
    console.log('conn')
    if (jwt === null || jwt === '' || jwt === undefined) {
      return;
    }
    let ws = new SockJS(environment.apiUrl + '/ws');
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({jwt: jwt}, (frame) => {

      //_this.stompClient.reconnect_delay = 2000;
    }, (e) => {
      console.error(e);
      setTimeout(() => {
        if (jwt !== null && jwt !== '' && jwt !== undefined) {
          this.connectWs(jwt);
        }

      }, environment.wsReconnectInterval);
    });
  }

  async publish(channel: string, body: any) {
    this.stompClient.send('/ws/publisher/' + channel, {}, JSON.stringify(body)); // stringfify?
  }

  subscribe(channel: string, privateChannel: boolean, subject: BehaviorSubject<any>) {
    this.stompClient.subscribe((privateChannel ? '/private' : '') + '/ws/subscribe/' + channel, (message) => {
      subject.next(JSON.parse(message.body));
    });
    //TODO FUTURE: handle unsubcriptions
    //TODO FUTURE: re-structure chat system =)
  }

  async disconnectWs() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    this.stompClient = null;
  }

}

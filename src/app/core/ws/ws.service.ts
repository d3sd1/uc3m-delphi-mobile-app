import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  channels = [];
  private stompClient: Stomp = null;

  //TODO -> store subscribed channels and handle reconnect with 'em

  // if socket fails
  constructor() {
  }

  async connectWs(jwt: string) {
    if (jwt === null || jwt === '' || jwt === undefined) {
      return;
    }
    let ws = new SockJS(environment.apiUrl + '/ws');
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({jwt: jwt}, (frame) => {
      this.reconnectChannels();
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
    this.stompClient.send('/ws/publisher/' + channel, {}, JSON.stringify(body));
  }

  reconnectChannels() {
    this.channels.forEach((channel) => {
      this.subscribe(channel.channel, channel.privateChannel, channel.subject);
    });
  }

  subscribe(channel: string, privateChannel: boolean, subject: BehaviorSubject<any>) {
    //TODO verify not connected before
    if (this.stompClient.status === 'CONNECTED') {
      this.stompClient.subscribe((privateChannel ? '/private' : '') + '/ws/subscribe/' + channel, (message) => {
        subject.next(JSON.parse(message.body));
      });
    } else {
      this.channels.push({
        channel: channel, privateChannel: privateChannel, subject: subject
      });
    }
  }

  async disconnectWs() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    this.stompClient = null;
  }

}

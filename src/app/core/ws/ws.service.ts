import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {WsChannel} from './ws-channel';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  pendingConnectionChannels = new ReplaySubject();
  private stompClient: Stomp = null;

  async connectWs(jwt: string) {
    if (jwt === null || jwt === '' || jwt === undefined) {
      return;
    }
    const ws = new SockJS(environment.apiUrl + '/ws', {transports: ['websocket']});
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({jwt: jwt}, (frame) => {
      this.channelConnector();
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

  channelConnector() {
    this.pendingConnectionChannels.subscribe((channel: WsChannel) => {
      this.stompClient.subscribe((channel.privateChannel ? '/private' : '') + '/ws/subscribe/' + channel.channel, (message) => {
        const data = JSON.parse(message.body);
        channel.subject.getValue().push(data);
        channel.subject.next(data); // should thid be managed?
      });
    });
  }

  subscribe(channel: string, privateChannel: boolean, subject: BehaviorSubject<any>) {
    this.pendingConnectionChannels.next(new WsChannel(channel, privateChannel, subject));
  }

  async disconnectWs() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    this.stompClient = null;
  }

}

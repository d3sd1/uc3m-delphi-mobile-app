import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject, ReplaySubject, Subject} from 'rxjs';
import {environment} from '../../../environments/environment';
import {WsChannel} from './ws-channel';
import {QueueScheduler} from 'rxjs/internal/scheduler/QueueScheduler';
import {QueueAction} from 'rxjs/internal/scheduler/QueueAction';

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
    let ws = new SockJS(environment.apiUrl + '/ws');
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
        const wsMsg = JSON.parse(message.body);
        const mode = wsMsg.mode;
        const data = wsMsg.data;
        if(mode == 'ADD') {
          channel.subject.getValue().push(data);
        } else if(mode == 'MODIFY') {
          channel.subject.getValue().filter(iData => iData.id !== data.id);
          channel.subject.getValue().push(data);
        } else if(mode == 'REMOVE') {
          channel.subject.getValue().filter(iData => iData.id !== data.id);
        }
        channel.subject.next(channel.subject.getValue());
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

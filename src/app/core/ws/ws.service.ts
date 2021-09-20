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
        const wsMsg = JSON.parse(message.body);
        const mode = wsMsg.mode;
        const data = wsMsg.data;
        let arr = [];
        if(mode == 'ADD') {
          channel.subject.getValue().push(data);
          arr = channel.subject.getValue();
        } else if(mode == 'MODIFY') {
          arr = channel.subject.getValue().filter(iData => iData.id !== data.id);
          arr.push(data);
        } else if(mode == 'REMOVE') {
          console.log("REMOVE", data)
          arr = channel.subject.getValue().filter(iData => iData.id !== data.id);
        }
        channel.subject.next(arr);
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

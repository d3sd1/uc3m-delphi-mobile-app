import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject, Subscription} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {WsMode} from './ws-mode.model';
import {JwtService} from '../jwt.service';
import {WsAction} from './ws-action.model';
import {WsCommand} from './ws-command.model';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private wsConnection: BehaviorSubject<Stomp>;
  private commands: BehaviorSubject<WsCommand[]>;
  private commandSubscriptions: Subscription[];

  constructor(private jwtService: JwtService) {
    this.initFields();
    this.jwtService.getJwt().subscribe((jwt) => {
      console.log('received jwt on ws:', jwt);
      if (jwt === null || jwt === undefined || jwt === '' || jwt === 'null') {
        console.error('JWT is not set, not connecting to websocket.');
        this.disconnectWs();
        return;
      }

      this.handleConnection(jwt);
      this.handleActions();
    });
  }

  getConnection(): BehaviorSubject<Stomp> {
    return this.wsConnection;
  }

  publish(channel: string, body: any, mode: WsMode) {
    const wsCommand = new WsCommand();
    wsCommand.wsAction = WsAction.PUBLISH;
    wsCommand.channel = channel;
    wsCommand.body = body;
    wsCommand.mode = mode;
    const a = this.commands.getValue();
    a.push(wsCommand);
    this.commands.next(a);
  }

  listen(channel: string, privateChannel: boolean, subject: BehaviorSubject<any>) {
    const wsCommand = new WsCommand();
    wsCommand.wsAction = WsAction.SUBSCRIBE;
    wsCommand.channel = channel;
    wsCommand.privateChannel = privateChannel;
    wsCommand.subject = subject;
    const a = this.commands.getValue();
    a.push(wsCommand);
    this.commands.next(a);
  }

  disconnectWs() {
    if (this.jwtService.getJwt().getValue() !== null
      && this.jwtService.getJwt().getValue() !== undefined
      && this.jwtService.getJwt().getValue() !== 'null'
      && this.jwtService.getJwt().getValue() !== '') {
      this.jwtService.setJwt(null);
    }
    if (this.wsConnection.getValue() === null) {
      return;
    }
    this.commandSubscriptions.forEach((sub: Subscription) => {
      if (sub && !sub.closed) {
        sub.unsubscribe();
      }
    });
    this.commands.getValue().forEach((cmd) => {
      cmd.connected = false;
    });
    if (this.getConnection().getValue() !== null) {
      this.getConnection().getValue().disconnect();
    }
    this.initFields();
    this.wsConnection.next(null);
  }

  private initFields() {
    this.wsConnection = new BehaviorSubject<Stomp>(null);
    this.commands = new BehaviorSubject<Stomp>([]);
    this.commandSubscriptions = [];
  }

  private handleConnection(jwt: string) {
    const ws = new SockJS(environment.apiUrl + '/ws', {transports: ['websocket']});
    const stompClient = Stomp.over(ws);
    stompClient.connect({jwt}, () => {
      this.wsConnection.next(stompClient);
    }, (e) => {
      console.error(e);
      this.disconnectWs();
    });
  }

  private handleActions(): void {
    this.getConnection().subscribe((con) => {
      console.log('received ws con:', con);
      if (con === null) {
        return;
      }
      this.commands.subscribe((commands) => {
        commands.forEach((cmd) => {
          if (WsAction[cmd.wsAction] === 'DISCONNECT') {
            this.disconnectWs();
            return;
          }
          if (cmd.connected) {
            return;
          }
          // Execute actions
          if (WsAction[cmd.wsAction] === 'PUBLISH') {
            con.send('/ws/' + cmd.channel + '/' + WsMode[cmd.mode].toLowerCase(), {}, JSON.stringify(cmd.body));
            cmd.connected = true;
            this.commands.next(commands.filter((cmd2) => cmd !== cmd2));
          } else if (WsAction[cmd.wsAction] === 'SUBSCRIBE') {
            this.commandSubscriptions.push(con.subscribe((cmd.privateChannel ? '/private' : '') + '/ws/subscribe/' + cmd.channel, (message) => {
              const data = JSON.parse(message.body);
              cmd.connected = true;
              cmd.subject.next(data);
            }));
          }
        });
      });
    });
  }

}

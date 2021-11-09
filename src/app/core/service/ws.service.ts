import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject, Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {WsMode} from '../ws/ws-mode.model';
import {JwtService} from './jwt.service';
import {WsAction} from '../ws/ws-action.model';
import {WsCommand} from '../ws/ws-command.model';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private wsConnection: BehaviorSubject<Stomp> = new BehaviorSubject<Stomp>(null);
  private commands: BehaviorSubject<WsCommand[]> = new BehaviorSubject<Stomp>([]);
  private commandSubscriptions: Subscription[] = [];

  constructor(private jwtService: JwtService) {
    this.handleConnection();
    this.handleActions();
  }

  private handleConnection() {
    this.jwtService.getJwt().subscribe((jwt) => {
      if (jwt === null) {
        console.error('JWT is not set, not connecting to websocket.');
        return;
      }
      const ws = new SockJS(environment.apiUrl + '/ws', {transports: ['websocket']});
      const stompClient = Stomp.over(ws);
      stompClient.connect({jwt}, () => {
        this.wsConnection.next(stompClient);
      }, (e) => {
        console.error(e);
        this.disconnectWs();
      });
    });
  }

  private handleActions(): void {
    this.getConnection().subscribe((con) => {
      if (con === null) {
        return;
      }
      this.commands.subscribe((commands) => {
        commands.forEach((cmd) => {
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

  subscribe(channel: string, privateChannel: boolean, subject: BehaviorSubject<any>) {
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
    this.commandSubscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
    this.commands.getValue().forEach((cmd) => {
      cmd.connected = false;
    });
    if (this.getConnection().getValue() !== null) {
      this.getConnection().getValue().disconnect();
    }
    this.wsConnection.next(null);
  }

}

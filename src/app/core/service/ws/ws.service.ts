import {Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {BehaviorSubject, Subscription} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {WsMode} from './ws-mode.model';
import {JwtService} from '../jwt.service';
import {WsAction} from './ws-action.model';
import {WsCommand} from './ws-command.model';
import {NavController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class WsService {
  private wsConnection: BehaviorSubject<Stomp> = new BehaviorSubject<Stomp>(null);
  private commands: BehaviorSubject<WsCommand[]> = new BehaviorSubject<Stomp>([]);
  private commandSubscriptions: Subscription[] = [];
  private jwtSubscription: Subscription;
  private connectionSubscription: Subscription;
  private commandsSubscription: Subscription;

  constructor(private jwtService: JwtService, private navCtrl: NavController) {
    this.handleConnection();
    this.handleActions();
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
    if (this.commandSubscriptions) {
      this.commandSubscriptions.forEach((sub: Subscription) => {
        if (!sub.closed) {
          sub.unsubscribe();
        }
      });
    }
    this.commands.getValue().forEach((cmd) => {
      cmd.connected = false;
    });
    if (this.getConnection().getValue() !== null) {
      this.getConnection().getValue().disconnect();
    }
    if (this.jwtSubscription && !this.jwtSubscription.closed) {
      this.jwtSubscription.unsubscribe();
    }
    if (this.connectionSubscription && !this.connectionSubscription.closed) {
      this.connectionSubscription.unsubscribe();
    }
    if (this.commandsSubscription && !this.commandsSubscription.closed) {
      this.commandsSubscription.unsubscribe();
    }
    this.wsConnection.next(null);
  }

  private handleConnection() {
    this.jwtSubscription = this.jwtService.getJwt().subscribe((jwt) => {
      console.log('go for connection!!', jwt)
      if (jwt === null) {
        return;
      }
      const ws = new SockJS(environment.apiUrl + '/ws', {transports: ['websocket']});
      const stompClient = Stomp.over(ws);
      stompClient.connect({jwt}, () => {
        this.wsConnection.next(stompClient);
      }, (e) => {
        console.log('force discon!!');
        console.error(e);
        this.navCtrl.navigateBack('/logged-out').then(null);
        this.disconnectWs();
      });
    });
  }

  private handleActions(): void {
    this.connectionSubscription = this.getConnection().subscribe((con) => {
      if (con === null) {
        return;
      }
      this.commandsSubscription = this.commands.subscribe((commands) => {
        if (commands === null) {
          return;
        }
        commands.forEach((cmd) => {
          if (cmd.connected) {
            return;
          }
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

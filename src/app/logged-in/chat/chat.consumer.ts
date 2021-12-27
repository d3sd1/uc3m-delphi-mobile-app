import {Injectable} from '@angular/core';
import {WsService} from '../../core/service/ws/ws.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserChat} from '../../core/model/user-chat';
import {WsMode} from '../../core/service/ws/ws-mode.model';
import {JwtService} from '../../core/service/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ChatConsumer {

  private userChats: BehaviorSubject<UserChat[]> = new BehaviorSubject<UserChat[]>([]);

  constructor(private httpClient: HttpClient, private wsService: WsService,
              private jwtService: JwtService) {
    this.listenUpdates();
  }

  getChats(): BehaviorSubject<UserChat[]> {
    return this.userChats;
  }

  writeToChat(toUserId: number, msg: string) {
    this.wsService.publish('chat', {toUserId, msg}, WsMode.CREATE);
  }

  private listenUpdates() {
    this.jwtService.getJwt().subscribe((jwt) => {
      if (jwt === null || jwt === undefined || jwt === '' || jwt === 'null') {
        return;
      }
      this.wsService.listen('chat', true, this.userChats);
    });
  }
}

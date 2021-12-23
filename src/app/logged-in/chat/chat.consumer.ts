import {Injectable} from '@angular/core';
import {WsService} from '../../core/service/ws/ws.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserChat} from '../../core/model/user-chat';
import {WsMode} from '../../core/service/ws/ws-mode.model';

@Injectable({
  providedIn: 'root'
})
export class ChatConsumer {

  private userChats: BehaviorSubject<UserChat[]> = new BehaviorSubject<UserChat[]>([]);

  constructor(private httpClient: HttpClient, private wsService: WsService) {
    this.listenUpdates();
  }

  getChats(): BehaviorSubject<UserChat[]> {
    return this.userChats;
  }

  writeToChat(toUserId: number, msg: string) {
    this.wsService.publish('chat', {toUserId, msg}, WsMode.CREATE);
  }

  private listenUpdates() {
    this.wsService.subscribe('chat', true, this.userChats);
  }
}

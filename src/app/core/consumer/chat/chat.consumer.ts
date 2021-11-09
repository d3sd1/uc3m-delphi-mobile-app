import {Injectable} from '@angular/core';
import {WsService} from '../../service/ws.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserChat} from '../../model/user-chat';
import {WsMode} from '../../ws/ws-mode.model';

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

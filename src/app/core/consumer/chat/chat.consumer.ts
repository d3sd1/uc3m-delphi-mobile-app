import {Injectable} from '@angular/core';
import {WsService} from '../../service/ws.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {UserChat} from '../../model/user-chat';
import {Storage} from '@ionic/storage';
import {TranslateService} from '@ngx-translate/core';
import {DatabaseService} from '../database.service';
import {Router} from '@angular/router';
import {JwtService} from '../../service/jwt.service';
import {LoginUser} from '../user/login.user';
import {LoginResponse} from '../user/login.response';
import {Process} from '../../model/process';
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

  openChat() {
    this.wsService.publish('chat', {}, WsMode.CREATE);
  }

  private listenUpdates() {
    this.wsService.subscribe('chat', true, this.userChats);
  }
}

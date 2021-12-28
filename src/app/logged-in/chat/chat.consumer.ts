import {Injectable} from '@angular/core';
import {WsService} from '../../core/service/ws/ws.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {UserChat} from '../../core/model/user-chat';
import {WsMode} from '../../core/service/ws/ws-mode.model';
import {JwtService} from '../../core/service/jwt.service';
import {ChatMessage} from '../../core/model/chat-message';

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
      this.wsService.listen('chat', true, this.userChats, (userChats) => {
        // sort messages for each chat
        userChats.forEach((chat) => {
          chat.messages.sort((chatMessage1: ChatMessage, chatMessage2: ChatMessage) => {
            let pos = 0;
            if (chatMessage1.timestamp < chatMessage2.timestamp) {
              pos = -1;
            } else if (chatMessage1.timestamp > chatMessage2.timestamp) {
              pos = 1;
            }
            return pos;
          });
        });
        // sort chats order (needs sorted messages before)
        userChats.sort((chat1: UserChat, chat2: UserChat) => {
          let pos = 0;
          if ((!chat1.messages || chat1.messages.length === 0) && (!chat2.messages || chat2.messages.length === 0)) {
            return 0;
          } else if (!chat1.messages || chat1.messages.length === 0) {
            return 1;
          } else if (!chat2.messages || chat2.messages.length === 0) {
            return -1;
          } else if (chat1.messages[0].timestamp < chat2.messages[0].timestamp) {
            pos = -1;
          } else if (chat1.messages[0].timestamp > chat2.messages[0].timestamp) {
            pos = 1;
          }
          return pos;
        });
      });
    });
  }
}

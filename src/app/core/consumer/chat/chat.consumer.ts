import { Injectable } from '@angular/core';
import {ChatMessage} from '../../../logged-in/chat/chat-conversation/chat-message';
import {WsService} from '../../ws/ws.service';
import {getChatsUnreadMessages, UserChat} from '../../../logged-in/chat/user-chat';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatConsumer {

  constructor(private wsService: WsService) { }
  /*
  chat(): BehaviorSubject<ChatMessage[]> { //TODO REFACTOR
    this.wsService.subscribe('chat/messages', true).subscribe(async (msg: ChatMessage) => {
      if (msg === null) {
        return;
      }
      if (!this.router.url.includes('menu/chat/')) {
        this.notifications.messages++;
      }
      await this.playSound();
    });

    this.chatService.getCurrentUserChats().subscribe((userChats: UserChat[]) => {
      this.notifications.messages = getChatsUnreadMessages(userChats, this.user.id);
    });
    this.preloadSound();
  }*/
  chat() {

  }
}

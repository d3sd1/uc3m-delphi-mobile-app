import {Injectable} from '@angular/core';
import {WsService} from '../../ws/ws.service';

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

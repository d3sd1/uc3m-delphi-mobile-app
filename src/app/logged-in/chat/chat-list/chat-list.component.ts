import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';
import {User} from '../../../core/model/user';
import {UserChat} from '../../../core/model/user-chat';
import {UserConsumer} from '../../../core/consumer/user/user.consumer';
import {ChatConsumer} from '../../../core/consumer/chat/chat.consumer';

@Component({
  selector: 'delphi-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {

  @Input()
  user: User;

  @Input()
  loading: boolean;

  @Input()
  userChatsOriginal: UserChat[] = [];

  userChats: UserChat[] = [];


  constructor() {

  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

  }

  markChatAsRead(chatId, slidingItem) {
   //TODO
    slidingItem.close();
  }

  deleteChat(chatId, slidingItem) {
    // TODO CALL SERVICE ON REST, also trigger kafka event to reload other user apps (?)
    // this.currentUserChatsBackup = this.currentUserChatsBackup.filter(chat => chat.id !== chatId);
    // this.currentUserChats = this.currentUserChatsBackup;
    this.removeNotificationsFromChat(chatId);
    slidingItem.close();
  }

  removeNotificationsFromChat(chatId) {
    // todo remove chat notification count from current chat and bottom
  }

}

import {Component, Input} from '@angular/core';
import {User} from '../../../core/model/user';
import {UserChat} from '../../../core/model/user-chat';
import {ChatConsumer} from '../../../core/consumer/chat/chat.consumer';
import {UserConsumer} from '../../../core/consumer/user/user.consumer';

@Component({
  selector: 'delphi-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  user: User;

  @Input()
  loading: boolean;

  userChatsOriginal: UserChat[] = [];

  userChats: UserChat[] = [];


  constructor(private chatConsumer: ChatConsumer, private userConsumer: UserConsumer) {
    this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
    });
    this.chatConsumer.getChats().subscribe((userChats) => {
      this.userChatsOriginal = userChats;
      this.userChats = [...this.userChatsOriginal];
      console.log('user chats:', this.userChats);
      this.loading = false;
    });
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

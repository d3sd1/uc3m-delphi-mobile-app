import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';
import {User} from '../../../core/model/user';
import {UserChat} from '../../../core/model/user-chat';

@Component({
  selector: 'delphi-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  loading: boolean;

  userChats: UserChat[] = [];
  userChatsOriginal: UserChat[] = [];

  constructor(private chatService: ChatService) {
  }


  async ngOnInit() {
    this.chatService.getCurrentUserChats().subscribe((currentUserChats: UserChat[]) => {
      this.userChats = currentUserChats;
      this.userChatsOriginal = [...this.userChats];
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
    this.chatService.postReadChat(chatId).then(() => {
      this.chatService.getCurrentUserChats();
    });
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

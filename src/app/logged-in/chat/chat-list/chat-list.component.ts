import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';
import {User} from '../../user';
import {getChatInfo, getChatPicture, getChatUnreadMessages, getUserChatStatus, UserChat} from '../user-chat';
import {UserStorage} from '../../../core/storage/user.storage';

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

  @Input()
  userChats: UserChat[] = [];
  userChatsBackup: UserChat[] = [];

  constructor(private chatService: ChatService, private authService: UserStorage) {
  }

  selfChatUnreadMessages(userChat: UserChat, currentUserId: number): number {
    return getChatUnreadMessages(userChat, currentUserId);
  }

  selfChatName(chat: UserChat) {
    return getChatInfo(chat, this.user.id).name;
  }

  selfChatPicture(chat: UserChat): string {
    return getChatPicture(chat, this.user.id);
  }

  selfUserChatStatus(chat: UserChat): string {
    return getUserChatStatus(chat, this.user.id).toLowerCase();
  }

  async ngOnInit() {
    this.userChatsBackup = [...this.userChats];
    console.log(this.userChats)
  }

  async filterList(evt) {
    console.log(this.userChatsBackup)
    this.userChats = this.userChatsBackup;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.userChats = this.userChats.filter(currentChat => {
      currentChat.users.forEach((user: User) => {
        const fullName = user.name + ' ' + user.surnames;
        if (fullName && searchTerm) {
          return (fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
        }
      });
    });
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

import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../../../../mock/chat.service';
import {getChatName, getChatPicture, getChatUnreadMessages, UserChat} from '../../../../model/user-chat';
import {User} from '../../../../model/user';
import {AuthenticationService} from '../../../../services/authentication-service';

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

  constructor(private chatService: ChatService, private authService: AuthenticationService) {
  }

  selfChatUnreadMessages(userChat: UserChat, currentUserId: number): number {
    return getChatUnreadMessages(userChat, currentUserId);
  }

  selfChatName(chat: UserChat) {
    return getChatName(chat, this.user.id);
  }

  selfChatPicture(chat: UserChat): string {
    return getChatPicture(chat, this.user.id);
  }

  async ngOnInit() {
    this.userChats = this.userChatsBackup;
    console.log(this.userChats);
  }

  async filterList(evt) {
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
    //this.currentUserChatsBackup = this.currentUserChatsBackup.filter(chat => chat.id !== chatId);
    //this.currentUserChats = this.currentUserChatsBackup;
    this.removeNotificationsFromChat(chatId);
    slidingItem.close();
  }

  removeNotificationsFromChat(chatId) {
    // todo remove chat notification count from current chat and bottom
  }

}

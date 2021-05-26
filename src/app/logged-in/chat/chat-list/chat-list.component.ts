import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../chat.service';
import {User} from '../../user';
import {getChatInfo, getChatPicture, getChatUnreadMessages, getUserChatStatus, UserChat} from '../user-chat';

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

  selfChatUnreadMessages(userChat: UserChat, currentUserId: number): number {
    return getChatUnreadMessages(userChat, currentUserId);
  }

  selfChatName(chat: UserChat) {
    const userChat = getChatInfo(chat, this.user.id);
    let chatName = userChat.name;
    if (chatName === '' ||
      chatName === undefined ||
      chatName === null) {
      chatName = userChat.email;
    }
    return chatName;
  }

  selfChatPicture(chat: UserChat): string {
    return getChatPicture(chat, this.user.id);
  }

  selfUserChatStatus(chat: UserChat): string {
    return getUserChatStatus(chat, this.user.id).toLowerCase();
  }

  async ngOnInit() {

    this.chatService.getCurrentUserChats().subscribe((currentUserChats: UserChat[]) => {
      console.log(currentUserChats);
      this.userChats = currentUserChats;
      this.userChatsOriginal = [...this.userChats];
      this.loading = false;
    });
    console.log(this.userChats);
  }

  async filterList(evt) {
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    // this crash the app if setting variable. todo on refactor
    this.userChatsOriginal.filter(currentChat => {
      currentChat.users.forEach((user: User) => {
        const fullName = user.name + ' ' + user.surnames + ' ' + user.email;
        if (fullName && searchTerm) {
          console.log(fullName.toLowerCase().indexOf(searchTerm.toLowerCase()));
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

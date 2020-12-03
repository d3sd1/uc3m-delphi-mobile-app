import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ChatService} from '../../../../mock/chat.service';

@Component({
  selector: 'delphi-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage implements OnInit {
  @Output() onDatePicked: EventEmitter<any> = new EventEmitter<any>();

  loading = false;

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }

  currentUserChats = [];
  currentUserChatsBackup = [];

  @Output()
  onUnreadMessagesUpdate: EventEmitter<any> = new EventEmitter<any>();

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.reloadChats();
  }

  reloadChats() {
    this.currentUserChatsBackup = this.chatService.getCurrentUserChats();
    this.currentUserChats = this.currentUserChatsBackup;
    document.dispatchEvent(new CustomEvent('notificationCountUpdate', {detail: this.currentUserChatsBackup.reduce((a, b) => a + (b.unreadMessages || 0), 0)}));
  }

  async filterList(evt) {
    this.currentUserChats = this.currentUserChatsBackup;
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    this.currentUserChats = this.currentUserChats.filter(currentFood => {
      const fullName = currentFood.userName + ' ' + currentFood.userSurnames;
      if (fullName && searchTerm) {
        return (fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  markChatAsRead(chatId, slidingItem) {
    const readChat = this.currentUserChatsBackup.find(chat => chat.id === chatId);
    readChat.unreadMessages = 0;
    this.reloadChats();
    slidingItem.close();
  }

  deleteChat(chatId, slidingItem) {
    // TODO CALL SERVICE ON REST, also trigger kafka event to reload other user apps (?)
    this.currentUserChatsBackup = this.currentUserChatsBackup.filter(chat => chat.id !== chatId);
    this.currentUserChats = this.currentUserChatsBackup;
    this.removeNotificationsFromChat(chatId);
    slidingItem.close();
  }

  removeNotificationsFromChat(chatId) {
    // todo remove chat notification count from current chat and bottom
  }

}

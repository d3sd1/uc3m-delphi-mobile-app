import {Component, Input, OnDestroy} from '@angular/core';
import {User} from '../../../core/model/user';
import {UserChat} from '../../../core/model/user-chat';
import {ChatConsumer} from '../chat.consumer';
import {UserConsumer} from '../../user.consumer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'delphi-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent implements OnDestroy {
  user: User;

  @Input()
  loading: boolean;

  userChatsOriginal: UserChat[] = [];

  userChats: UserChat[] = [];
  userSubscription: Subscription;
  chatSubscription: Subscription;


  constructor(private chatConsumer: ChatConsumer, private userConsumer: UserConsumer) {
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
    });
    this.chatSubscription = this.chatConsumer.getChats().subscribe((userChats) => {
      this.userChatsOriginal = userChats;
      this.userChats = [...this.userChatsOriginal];
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    if (!this.chatSubscription.closed) {
      this.chatSubscription.unsubscribe();
    }

    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    this.user = undefined;
    this.loading = false;
    this.userChatsOriginal = [];
    this.userChats = [];
  }


  filterList(evt) {
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return;
    }

    return this.userChats = this.userChatsOriginal.filter((userChat) => {
      return userChat.user1.name.includes(searchTerm)
        || userChat.user1.surnames.includes(searchTerm)
        || userChat.user1.email.includes(searchTerm)
        || userChat.user2.name.includes(searchTerm)
        || userChat.user2.surnames.includes(searchTerm)
        || userChat.user2.email.includes(searchTerm);
    });
  }

  markChatAsRead(chatId, slidingItem) {
    //TODO
    slidingItem.close();
  }

  deleteChat(chatId, slidingItem) {
    this.removeNotificationsFromChat(chatId);
    slidingItem.close();
  }

  removeNotificationsFromChat(chatId) {
    // todo remove chat notification count from current chat and bottom
  }

}

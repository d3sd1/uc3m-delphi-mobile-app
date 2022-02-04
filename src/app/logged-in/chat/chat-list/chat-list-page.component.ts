import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../core/model/user';
import {UserChat} from '../../../core/model/user-chat';
import {ChatConsumer} from '../chat.consumer';
import {UserConsumer} from '../../user.consumer';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'delphi-chat-list',
  templateUrl: './chat-list-page.component.html',
  styleUrls: ['./chat-list-page.component.scss'],
})
export class ChatListPage implements OnInit, OnDestroy {
  user: User;

  @Input()
  loading: boolean;

  userChatsOriginal: UserChat[] = [];

  userChats: UserChat[] = [];
  userSubscription: Subscription;
  chatSubscription: Subscription;


  constructor(private chatConsumer: ChatConsumer, private userConsumer: UserConsumer,
              private route: ActivatedRoute) {

  }


  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
          if (user === null) {
            return;
          }
          this.user = user;
        });
        this.chatSubscription = this.chatConsumer.getChats().subscribe((userChats) => {
          if (userChats === null) {
            return;
          }
          this.userChatsOriginal = Array.from(userChats);
          this.userChats = Array.from(this.userChatsOriginal);
          this.loading = false;
        });
      });
  }


  ngOnDestroy(): void {

    if (this.chatSubscription && !this.chatSubscription.closed) {
      this.chatSubscription.unsubscribe();
    }

    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    this.user = undefined;
    this.loading = false;
    this.userChatsOriginal = [];
    this.userChats = [];
  }


  filterList(evt) {
    const searchTerm = evt.srcElement.value;

    if (!searchTerm || searchTerm === '' || searchTerm.trim().length === 0) {
      this.userChats = this.userChatsOriginal;
      return;
    }

    this.userChats = this.userChatsOriginal.filter((userChat) => {
      return userChat.user1.name.toLowerCase().includes(searchTerm.toLowerCase())
        || userChat.user1.surnames.toLowerCase().includes(searchTerm.toLowerCase())
        || userChat.user1.email.toLowerCase().includes(searchTerm.toLowerCase())
        || userChat.user2.name.toLowerCase().includes(searchTerm.toLowerCase())
        || userChat.user2.surnames.toLowerCase().includes(searchTerm.toLowerCase())
        || userChat.user2.email.toLowerCase().includes(searchTerm.toLowerCase());
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

  }

}

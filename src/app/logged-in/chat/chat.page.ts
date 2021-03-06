import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserChat} from '../../core/model/user-chat';
import {User} from '../../core/model/user';
import {UserConsumer} from '../user.consumer';
import {ChatConsumer} from './chat.consumer';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'delphi-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage implements OnInit, OnDestroy {
  loading = true;
  userChats: UserChat[];
  user: User;
  userSubscription: Subscription;
  chatSubscription: Subscription;

  constructor(private userConsumer: UserConsumer, private chatConsumer: ChatConsumer,
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
          this.userChats = userChats;
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
    this.userChats = [];
  }


}

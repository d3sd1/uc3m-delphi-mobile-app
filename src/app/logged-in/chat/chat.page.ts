import {Component} from '@angular/core';
import {UserChat} from '../../core/model/user-chat';
import {User} from '../../core/model/user';
import {UserConsumer} from '../../core/consumer/user/user.consumer';
import {ChatConsumer} from '../../core/consumer/chat/chat.consumer';

@Component({
  selector: 'delphi-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage {
  loading = true;
  userChats: UserChat[];
  user: User;


  constructor(private userConsumer: UserConsumer, private chatConsumer: ChatConsumer) {
    this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
    });
    this.chatConsumer.getChats().subscribe((userChats) => {
      this.userChats = userChats;
      this.loading = false;
    });
  }

}

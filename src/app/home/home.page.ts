import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../mock/chat.service';
import {getChatsUnreadMessages, UserChat} from '../../model/user-chat';
import {AuthenticationService} from '../../services/authentication-service';
import {User} from '../../model/user';

@Component({
  selector: 'delphi-tabs',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  notifications = {
    proccess: 0,
    messages: 0,
    profile: 0
  };
  user: User;

  constructor(private chatService: ChatService, private authService: AuthenticationService) {
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.chatService.getCurrentUserChats().subscribe((userChats: UserChat[]) => {
      console.log('UPDATE HERE!!', userChats);
      this.notifications.messages = getChatsUnreadMessages(userChats, this.user.id);
    });
  }
}

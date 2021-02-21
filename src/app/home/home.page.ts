import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication-service';
import {ChatService} from '../logged-in/chat/chat.service';
import {User} from '../logged-in/user';
import {getChatsUnreadMessages, UserChat} from '../logged-in/chat/user-chat';

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

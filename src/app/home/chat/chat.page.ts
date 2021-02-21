import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication-service';
import {ChatService} from '../../logged-in/chat/chat.service';
import {User} from '../../logged-in/user';
import {UserChat} from '../../logged-in/chat/user-chat';

@Component({
  selector: 'delphi-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage implements OnInit {
  loading = true;
  userChats: UserChat[] = [];
  user: User;


  constructor(private chatService: ChatService, private authService: AuthenticationService) {
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.reloadChats();
  }

  reloadChats() {
    this.chatService.getCurrentUserChats().subscribe((currentUserChats: UserChat[]) => {
      console.log(currentUserChats);
      this.userChats = currentUserChats;
      this.loading = false;
    });
  }

}

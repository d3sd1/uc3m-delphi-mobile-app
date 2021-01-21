import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../mock/chat.service';
import {UserChat} from '../../../model/user-chat';
import {AuthenticationService} from '../../../services/authentication-service';
import {User} from '../../../model/user';

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

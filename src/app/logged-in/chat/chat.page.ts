import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {UserChat} from '../../core/model/user-chat';
import {User} from '../../core/model/user';

@Component({
  selector: 'delphi-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage implements OnInit {
  loading = true;
  userChats: UserChat[] = [];
  user: User;


  constructor(private chatService: ChatService) {
  }

  async ngOnInit() {
    //TODO this.user = await this.authService.getUser();
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

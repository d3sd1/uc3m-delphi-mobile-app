import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import {UserChat} from './user-chat';
import {User} from '../user';
import {UserStorage} from '../../core/storage/user.storage';

@Component({
  selector: 'delphi-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss']
})
export class ChatPage implements OnInit {
  loading = true;
  userChats: UserChat[] = [];
  user: User;


  constructor(private chatService: ChatService, private authService: UserStorage) {
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.reloadChats();
  }

  reloadChats() {
    this.chatService.getCurrentUserChats().subscribe((currentUserChats: UserChat[]) => {
      this.userChats = currentUserChats;
      this.loading = false;
    });
  }

}

import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat/chat.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {User} from './user';
import {AuthenticationService} from '../logged-out/login/authentication-service';
import {getChatsUnreadMessages, UserChat} from './chat/user-chat';

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

  constructor(private chatService: ChatService,
              private authService: AuthenticationService,
              private router: Router,
              private storage: Storage) {
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
    this.chatService.getCurrentUserChats().subscribe((userChats: UserChat[]) => {
      this.notifications.messages = getChatsUnreadMessages(userChats, this.user.id);
    });
    await this.onboarding();
  }

  async onboarding() {
    const needsOnboard = await this.authService.needsOnboard();
    if (needsOnboard && await this.storage.get('onboard') !== false) {
      await this.router.navigateByUrl('/home/onboarding');
    }
  }
}

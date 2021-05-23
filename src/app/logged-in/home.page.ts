import {Component} from '@angular/core';
import {ChatService} from './chat/chat.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {User} from './user';
import {getChatsUnreadMessages, UserChat} from './chat/user-chat';
import {ChatMessage} from './chat/chat-conversation/chat-message';
import {WsService} from '../core/ws/ws.service';
import {ViewDidEnter} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {UserConsumer} from '../core/consumer/user/user.consumer';
import {LangService} from '../core/lang/lang.service';
import {ChatConsumer} from '../core/consumer/chat/chat.consumer';

@Component({
  selector: 'delphi-tabs',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements ViewDidEnter {

  notifications = {
    proccess: 0,
    messages: 0,
    profile: 0
  };
  user: User;
  aud;

  constructor(private chatService: ChatService,
              private userConsumer: UserConsumer,
              private router: Router,
              private storage: Storage,
              private wsService: WsService,
              private translate: TranslateService,
              private langService: LangService,
              private chatConsumer: ChatConsumer) {
  }

  async ionViewDidEnter() {
    (await this.userConsumer.getUser()).subscribe((user) => {
      this.user = user;
    });
    this.langService.changeLanguage(this.user.language);

    /*TODO this.chatConsumer.chat().subscribe((chatMessages: ChatMessage[]) => {
      this.notifications.messages = chatMessages.filter((chatMessage) => !chatMessage.read).length;
    });*/

    await this.onboarding();
  }

  preloadSound() {
    const sound = '/assets/chat-sound.mp3';
    this.aud = new Audio(sound);
    this.aud.muted = false;
    this.aud.load();
  }

  async playSound(): Promise<void> {
    try {
      await this.aud.play();
    } catch (e) {

    }
  }

  async onboarding() {/* TODO
    const needsOnboard = await this.authService.needsOnboard();
    if (needsOnboard && await this.storage.get('onboard') !== false) {
      await this.router.navigateByUrl('/logged-in/home/onboarding');
    }*/
  }
}

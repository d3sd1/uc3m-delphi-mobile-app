import {Component} from '@angular/core';
import {ChatService} from './chat/chat.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {User} from './user';
import {UserStorage} from '../core/storage/user.storage';
import {getChatsUnreadMessages, UserChat} from './chat/user-chat';
import {ChatMessage} from './chat/chat-conversation/chat-message';
import {WsService} from '../core/ws/ws.service';
import {ViewDidEnter} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {UserConsumer} from '../core/consumer/user/user.consumer';

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
              private authService: UserStorage,
              private router: Router,
              private storage: Storage,
              private wsService: WsService,
              private userStorage: UserStorage,
              private translate: TranslateService,
              private userConsumer: UserConsumer) {
  }

  async ionViewDidEnter() {
    console.log('LOGGED IN?? -> ', await this.userConsumer.isLoggedIn())
    this.user = await this.authService.getUser();
    const userLang = (await this.userStorage.getUser()).language?.keyName;
    this.translate.use(userLang?.toLowerCase());

    this.wsService.subscribe('chat/messages', true).subscribe(async (msg: ChatMessage) => {
      if (msg === null) {
        return;
      }
      if (!this.router.url.includes('menu/chat/')) {
        this.notifications.messages++;
      }
      await this.playSound();
    });
    this.chatService.getCurrentUserChats().subscribe((userChats: UserChat[]) => {
      this.notifications.messages = getChatsUnreadMessages(userChats, this.user.id);
    });

    this.preloadSound();

    this.onboarding();
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

  async onboarding() {
    const needsOnboard = await this.authService.needsOnboard();
    if (needsOnboard && await this.storage.get('onboard') !== false) {
      await this.router.navigateByUrl('/logged-in/home/onboarding');
    }
  }
}

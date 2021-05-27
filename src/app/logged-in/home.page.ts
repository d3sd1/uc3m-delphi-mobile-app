import {Component} from '@angular/core';
import {ChatService} from './chat/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {User} from '../core/model/user';
import {WsService} from '../core/ws/ws.service';
import {NavController, ViewDidEnter} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {UserConsumer} from '../core/consumer/user/user.consumer';
import {LangService} from '../core/lang/lang.service';
import {ChatConsumer} from '../core/consumer/chat/chat.consumer';
import {Subscription} from 'rxjs';

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
  userObserver: Subscription;

  constructor(private chatService: ChatService,
              private userConsumer: UserConsumer,
              private router: Router,
              private storage: Storage,
              private wsService: WsService,
              private translate: TranslateService,
              private langService: LangService,
              private chatConsumer: ChatConsumer,
              private navCtrl: NavController,
              private route: ActivatedRoute) {

    this.route.snapshot.data['user'].subscribe((user) => {
      this.user = user;
    });
  }

  async ionViewDidEnter() {
    console.log('usr is ', this.user)
    this.langService.changeLanguage(this.user.language);
    await this.needsOnboard();
    this.listenUserNotifications();
    this.listenChatNotifications();
    this.listenProcessesNotifications();
  }

  async needsOnboard() {
    // Somtrimes needsOnboard is threated as string.
    // @ts-ignore
    if (this.user.needsOnboard == 'true' || this.user.needsOnboard == true) {
      await this.navCtrl.navigateForward('/logged-in/onboarding');
    }
  }

  async listenUserNotifications() {
    this.userObserver = (await this.userConsumer.getUser()).subscribe((user) => {
      this.notifications.profile = 0;
      if (user.photo === '' || user.photo === null || user.photo === undefined) {
        this.notifications.profile++;
      }
    });
  }

  listenChatNotifications() {
    // TODO
  }

  listenProcessesNotifications() {
    // TODO
  }
}

import {Component} from '@angular/core';
import {ChatService} from './chat/chat.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {User} from '../core/model/user';
import {WsService} from '../core/service/ws.service';
import {NavController, ViewDidEnter, ViewDidLeave} from '@ionic/angular';
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
export class HomePage implements ViewDidEnter, ViewDidLeave {

  userSubscription: Subscription;

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

    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
      this.langService.changeLanguage(this.user?.language);
      this.needsOnboard();
      this.listenChatNotifications();
      this.listenProcessesNotifications();
      this.listenProfileNotifications();
    });
  }

  ionViewDidEnter(): void {
    // TODO
  }

  ionViewDidLeave(): void {
    this.userSubscription.unsubscribe();
  }


  needsOnboard() {
    // @ts-ignore
    if (this.user?.needsOnboard === 'true' || this.user?.needsOnboard === true) {
      this.navCtrl.navigateForward('/logged-in/onboarding').then(r => null);
    }
  }

  listenChatNotifications() {
    // TODO
  }

  listenProcessesNotifications() {
    // TODO
  }
  listenProfileNotifications() {
    this.notifications.profile = 0;
    if (this.user?.photo === '' || this.user?.photo === null || this.user?.photo === undefined) {
      this.notifications.profile++;
    }
  }
}

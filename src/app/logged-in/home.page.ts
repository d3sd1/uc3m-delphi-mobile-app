import {Component, OnDestroy} from '@angular/core';
import {ChatService} from './chat/chat.service';
import {Storage} from '@ionic/storage';
import {User} from '../core/model/user';
import {WsService} from '../core/service/ws/ws.service';
import {NavController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {UserConsumer} from './user.consumer';
import {ChatConsumer} from './chat/chat.consumer';
import {Subscription} from 'rxjs';
import {ProcessConsumer} from './processes/process.consumer';
import {Process} from '../core/model/process';
import {UserChat} from '../core/model/user-chat';

@Component({
  selector: 'delphi-tabs',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnDestroy {

  userSubscription: Subscription;
  processesSubscription: Subscription;
  userChatsSubscription: Subscription;

  notifications = {
    proccess: 0,
    messages: 0,
    profile: 0
  };

  user: User;
  processes: Process[];
  userChats: UserChat[];


  constructor(private chatService: ChatService,
              private userConsumer: UserConsumer,
              private processConsumer: ProcessConsumer,
              private storage: Storage,
              private wsService: WsService,
              private translate: TranslateService,
              private chatConsumer: ChatConsumer,
              private navCtrl: NavController) {
    this.userSubscription = this.userConsumer.getUser().subscribe((u: User) => {
      if (u === null) {
        return;
      }
      this.user = u;
      this.needsOnboard(u);
      this.setNotificationCount();
    });

    this.userChatsSubscription = this.chatConsumer.getChats().subscribe((userChats) => {
      if (userChats === null) {
        return;
      }
      this.userChats = userChats;
      this.setNotificationCount();
    });
    this.processesSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
      if (processes === null) {
        return;
      }
      this.processes = processes;
      this.setNotificationCount();
    });

  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.processesSubscription.unsubscribe();
    this.userChatsSubscription.unsubscribe();
    this.notifications.proccess = 0;
    this.notifications.messages = 0;
    this.notifications.profile = 0;
  }

  needsOnboard(u: User) {
    if (u.needsOnboard === true) {
      this.navCtrl.navigateForward('/logged-in/onboarding').then(r => null);
    }
  }

  setChatNotifications() {
    if (this.user === null || this.userChats === null || this.user === undefined || this.userChats === undefined) {
      return;
    }
    this.notifications.messages = this.userChats.filter((uc) => uc.messages[uc.messages.length - 1].user.id !== this.user.id).length;
  }

  /**
   * Add notification if round is open and current user has not participated yet.
   * And also, add those where the user is coordinator and is not closed yet.
   * @param processes
   */
  setProcessesNotifications() {
    if (this.user === null || this.processes === null || this.user === undefined || this.processes === undefined) {
      return;
    }
    this.notifications.proccess = 0;
    this.notifications.proccess += this.processes.filter(process => {
      return !process.finished && process.currentRound.started && process.currentRound.expertsRemaining.find(u2 => this.user.id === u2.id);
    }).length;
    this.notifications.proccess += this.processes.filter(process => {
      return !process.finished && process.coordinators.find(u2 => this.user.id === u2.id);
    }).length;
  }

  private setNotificationCount() {
    this.setChatNotifications();
    this.setProcessesNotifications();
  }
}

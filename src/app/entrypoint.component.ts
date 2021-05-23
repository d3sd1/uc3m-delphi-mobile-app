import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {WsService} from './core/ws/ws.service';
import {AlertController, Platform} from '@ionic/angular';
import {PushNotificationService} from './core/push-notification/push-notification.service';
import {LangService} from './core/lang/lang.service';
import {CompatibilityService} from './core/devices/compatibility.service';
import {UserConsumer} from './core/consumer/user/user.consumer';

@Component({
  selector: 'delphi-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>`
})
export class EntrypointComponent implements OnInit {

  constructor(
    private platform: Platform,
    private langService: LangService,
    private ws: WsService,
    private pushNotificationService: PushNotificationService,
    private compatibilityService: CompatibilityService,
    private userConsumer: UserConsumer
  ) {
  }


  async ngOnInit(): Promise<void> {
    await this.userConsumer.fetchDatabaseCache();
    await this.ws.connectWs(await this.userConsumer.getJwt().getValue());
    await this.langService.init();
    this.pushNotificationService.init();
    await this.compatibilityService.checkDevice();
  }


}

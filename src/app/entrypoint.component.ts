import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {UserStorage} from './core/storage/user.storage';
import {WsService} from './core/ws/ws.service';
import {AlertController, Platform} from '@ionic/angular';
import {PushNotificationService} from './core/push-notification/push-notification.service';
import {LangService} from './core/lang/lang.service';
import {CompatibilityService} from './core/devices/compatibility.service';

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
    private userStorage: UserStorage,
    private ws: WsService,
    private pushNotificationService: PushNotificationService,
    private compatibilityService: CompatibilityService
  ) {
  }


  async ngOnInit(): Promise<void> {
    await this.ws.connectWs(await this.userStorage.getJwt());
    await this.langService.init();
    this.pushNotificationService.init();
    await this.compatibilityService.checkDevice();
  }


}

import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {
  Capacitor,
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import {LangService} from './logged-in/profile/lang.service';
import {UserStorage} from './core/storage/user.storage';
import {WsService} from './core/ws/ws.service';


const {PushNotifications} = Plugins;

@Component({
  selector: 'delphi-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>`
})
export class EntrypointComponent implements OnInit {
  /*
    constructor(
      private platform: Platform,
      private themeService: ThemeService,
      private loaderService: SplashScreenService
    ) {
      this.themeListenerInit();
      this.initializeApp();
    }

    private themeListenerInit() {
      this.themeService.addDarkThemeHandler();
      this.themeService.addLightThemeHandler();
    }


    initializeApp() {
     /* this.platform.ready().then(() => {
        this.loaderService.initialize();
      });
    }*/
  constructor(private translate: TranslateService, private langService: LangService, private userStorage: UserStorage,
              private ws: WsService) {

  }

  async ngOnInit(): Promise<void> {
    await this.ws.connectWs(await this.userStorage.getJwt());
    this.translate.setDefaultLang('es');
    this.translate.addLangs(['es', 'en']);
    if(await this.userStorage.isLoggedIn()){
      const userLang = (await this.userStorage.getUser()).language?.keyName;
      this.translate.use(userLang?.toLowerCase());
    }
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    if (isPushNotificationsAvailable) {

      PushNotifications.requestPermission().then(result => {
        if (result.granted) {
          // Register with Apple / Google to receive push via APNS/FCM
          PushNotifications.register();
        } else {
          // Show some error
        }
      });
      PushNotifications.addListener(
        'registration',
        (token: PushNotificationToken) => {
         // alert('Push registration success, token: ' + token.value);
        },
      );

      PushNotifications.addListener('registrationError', (error: any) => {
        //alert('Error on registration: ' + JSON.stringify(error));
      });

      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotification) => {
        //  alert('Push received: ' + JSON.stringify(notification));
        },
      );

      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
         // alert('Push action performed: ' + JSON.stringify(notification));
        },
      );
    }
  }


}

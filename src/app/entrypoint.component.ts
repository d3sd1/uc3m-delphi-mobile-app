import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {
  Capacitor,
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';

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
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
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
          alert('Push registration success, token: ' + token.value);
        },
      );

      PushNotifications.addListener('registrationError', (error: any) => {
        alert('Error on registration: ' + JSON.stringify(error));
      });

      PushNotifications.addListener(
        'pushNotificationReceived',
        (notification: PushNotification) => {
          alert('Push received: ' + JSON.stringify(notification));
        },
      );

      PushNotifications.addListener(
        'pushNotificationActionPerformed',
        (notification: PushNotificationActionPerformed) => {
          alert('Push action performed: ' + JSON.stringify(notification));
        },
      );
    }
  }


}

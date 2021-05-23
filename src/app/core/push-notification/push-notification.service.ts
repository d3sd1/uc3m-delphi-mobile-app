import {Injectable} from '@angular/core';
import {Capacitor, Plugins, PushNotification, PushNotificationActionPerformed, PushNotificationToken} from '@capacitor/core';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

const {PushNotifications} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private alertController: AlertController,
              private translate: TranslateService) {
  }

  init() {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    if (isPushNotificationsAvailable) {
      this.requestPermission();
    }
  }

  requestPermission() {
    PushNotifications.requestPermission().then(async (result) => {
      if (result.granted) {
        await PushNotifications.register();
      } else {
        const alert = await this.alertController.create({
          header: 'Agile Delphi',
          message: await this.translate.get('push_notifications.error').toPromise(),
          buttons: ['OK'],
          backdropDismiss: false
        });
        await alert.present();
      }
    });
  }

}
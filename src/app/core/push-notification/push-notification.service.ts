import {Injectable} from '@angular/core';
import {Capacitor, Plugins} from '@capacitor/core';
import {AlertController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';

const {PushNotifications} = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private alertController: AlertController,
              private translate: TranslateService) {
  }

  async init() {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    if (isPushNotificationsAvailable) {
      this.requestPermission();
    }
  }

  requestPermission() {
    PushNotifications.requestPermission().then((result) => {
      if (result.granted) {
        PushNotifications.register().then(r => null);
      } else {
        const alert = this.alertController.create({
          header: 'Agile Delphi',
          message: 'Error de notificaciones push',
          buttons: ['OK'],
          backdropDismiss: false
        });
      }
    });
  }

}

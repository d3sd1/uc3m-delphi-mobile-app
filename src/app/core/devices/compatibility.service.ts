import {Injectable} from '@angular/core';
import {AlertController, Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CompatibilityService {

  constructor(
    public alertController: AlertController,
    private platform: Platform,
  ) {
  }

  async checkDevice() {
    if ((!this.platform.is('ios') && !this.platform.is('android')) ||
      this.platform.is('mobileweb')) {
      this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error de compatibilidad',
        subHeader: 'Plataforma no soportada',
        message: `Tu plataforma [${this.platform.platforms()}] no está soportada.`,
        backdropDismiss: false
      }).then((alert) => alert.present());
    }
  }
}

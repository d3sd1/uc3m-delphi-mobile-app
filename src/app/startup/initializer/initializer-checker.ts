import {AlertController, Platform} from '@ionic/angular';
import {Plugins} from '@capacitor/core';

const {App} = Plugins;

export abstract class InitializerChecker {

  private displayMessage;

  protected constructor(protected alertController: AlertController, private platform: Platform) {
  }

  doCheck(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      this.internalCheck().then(async () => {
        resolve();
      }).catch(async () => {
        await this.showMessage();
        if (this.stopLoadingOnError()) {
          reject();
        }
      });
    });
  }

  protected abstract internalCheck(): Promise<void>;

  protected abstract errorMessage(): string;

  protected abstract stopLoadingOnError(): boolean;

  private async showMessage() {
    this.displayMessage = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Error en precarga de Delphi',
      message: this.errorMessage(),
      buttons: [
        (this.stopLoadingOnError() ?
          {
            text: 'Cerrar aplicación',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              App.exitApp();
            }
          } : {
            text: 'Continuar',
            handler: () => {

            }
          })
      ]
    });

    await this.displayMessage.present();
  }
}

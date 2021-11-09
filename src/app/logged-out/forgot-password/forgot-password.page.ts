import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController} from '@ionic/angular';
import {UserConsumer} from '../../core/consumer/user/user.consumer';

@Component({
  selector: 'delphi-login',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage {
  email: string = '';
  confirmCodeAlert;
  loading;

  constructor(private userConsumer: UserConsumer,
              public alertController: AlertController,
              public loadingController: LoadingController,
              private navCtrl: NavController) {
  }


  async confirmCode() {
    this.confirmCodeAlert = await this.alertController.create({
      header: 'Recuperación recibida',
      subHeader: 'Revisa tu buzón de correo electrónico',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Código de recuperación',
          attributes: {
            maxlength: 6,
            inputmode: 'decimal',
            autoFocus: true,
            onInput: (ev) => {
              const val = (ev.target as HTMLInputElement).value;
              if (val.length === 6) {
                this.validateCode(+val);
              }
            },
          },
        },
      ],
      buttons: ['Cancelar']
    });
    await this.confirmCodeAlert.present();
  }

  async invalidEmailAlert() {
    const alert = await this.alertController.create({
      header: 'Email incorrecto',
      subHeader: 'El email introducido no es válido.',
      buttons: ['Entendido']
    });
    await alert.present();
  }

  async validateCode(code: number) {
    this.confirmCodeAlert?.dismiss();
    await this.startLoading();
    this.userConsumer.resetPassword(this.email, code, () => {
        this.displaySuccess();
      },
      () => {
        this.displayError();
      }, () => {
        this.email = '';
        this.endLoading();
      });
  }

  async displaySuccess() {
    const alert = await this.alertController.create({
      header: 'Contraseña reseteada',
      subHeader: 'Se ha enviado tu nueva contraseña por correo electrónico.',
      buttons: ['Entendido']
    });
    await alert.present();
    await this.navCtrl.navigateBack('/logged-out/login');
  }

  async displayError() {
    const alert = await this.alertController.create({
      header: 'Fallo en el reseteo',
      subHeader: 'El código introducido no es correcto.',
      buttons: ['Entendido']
    });
    await alert.present();
  }

  async recover() {
    await this.startLoading();
    if (this.email === '') {
      await this.endLoading();
      await this.invalidEmailAlert();
      return;
    }
    await this.userConsumer.recoverPassword(this.email);
    await this.endLoading();
    await this.confirmCode();
  }

  async startLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 2000
    });
    await this.loading.present();
  }

  async endLoading() {
    this.loading?.dismiss();
  }

}

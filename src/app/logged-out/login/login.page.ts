import {Component} from '@angular/core';
import {LoadingController, NavController, ToastController} from '@ionic/angular';
import {UserConsumer} from '../../core/consumer/user/user.consumer';
import {LoginUser} from '../../core/consumer/user/login.user';
import {WsService} from '../../core/ws/ws.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'delphi-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginUser: LoginUser;

  constructor(private userConsumer: UserConsumer,
              private navCtrl: NavController,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private wsService: WsService,
              private translate: TranslateService) {
    this.loginUser = new LoginUser();
  }


  async login() {
    const loading = await this.showToast('login.connecting');
    this.userConsumer.doLogin(this.loginUser).then(async (sucMessage: string) => {
      await this.showToast(sucMessage);
      this.navCtrl.navigateForward('/logged-in').then(() => {
        this.loginUser = new LoginUser();
      });
    }).catch(async (errMessage: string) => {
      await this.showToast(errMessage);
    }).finally(() => {
      loading.dismiss();
    });
  }

  private async showToast(transKey: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: await this.translate.get(transKey).toPromise(),
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }
}

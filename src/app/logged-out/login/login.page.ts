import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';
import {LoginConsumer} from '../../core/consumer/login/login.consumer';
import {LoginUser} from '../../core/consumer/login/login.user';
import {WsService} from '../../core/ws/ws.service';

@Component({
  selector: 'delphi-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginUser: LoginUser;

  constructor(private loginConsumer: LoginConsumer,
              private router: Router,
              private loadingController: LoadingController,
              private toastController: ToastController,
              private wsService: WsService) {
    this.loginUser = new LoginUser();
  }

  async login() {
    const loading = await this.showToast('Un momento...');
    this.loginConsumer.doLogin(this.loginUser).then(async (sucMessage: string) => {
      await this.showToast(sucMessage);
      this.router.navigateByUrl('/logged-in').then(() => {
        this.loginUser = new LoginUser();
      });
    }).catch(async (errMessage: string) => {
      await this.showToast(errMessage);
    }).finally(() => {
      loading.dismiss();
    });
  }

  private async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }
}

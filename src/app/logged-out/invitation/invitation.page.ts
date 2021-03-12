import {Component, OnInit} from '@angular/core';
import {LoginUser} from '../../core/consumer/login/login.user';
import {LoginConsumer} from '../../core/consumer/login/login.consumer';
import {Router} from '@angular/router';
import {LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'delphi-invitation',
  templateUrl: './invitation.page.html',
  styleUrls: ['./invitation.page.scss'],
})
export class InvitationPage {
  loginUser: LoginUser;

  constructor(private loginConsumer: LoginConsumer,
              private router: Router,
              private loadingController: LoadingController,
              private toastController: ToastController) {
    this.loginUser = new LoginUser();
  }

  async finishInvitation() {
    const loading = await this.showToast('Un momento...');

    this.router.navigateByUrl('/logged-out/login').then(() => {
      this.loginUser = new LoginUser();
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

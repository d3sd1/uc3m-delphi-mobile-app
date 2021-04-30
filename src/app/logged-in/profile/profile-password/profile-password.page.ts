import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {User} from '../../user';
import {UserStorage} from '../../../core/storage/user.storage';
import {LoginUser} from '../../../core/consumer/login/login.user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'delphi-profile-password',
  templateUrl: './profile-password.page.html',
  styleUrls: ['./profile-password.page.scss'],
})
export class ProfilePasswordPage implements OnInit {

  user: User;
  reset;

  constructor(
    private navCtrl: NavController,
    private authService: UserStorage,
    private toastController: ToastController,
    private httpClient: HttpClient,
    private translate: TranslateService) {
    this.resetForm();
  }

  resetForm() {
    this.reset = {
      currentPass: '',
      newPass: '',
      newPassRep: ''
    };
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
  }

  goBack() {
    this.navCtrl.back();
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

  async resetPass() {
    this.resetForm();
    if (this.reset.newPass !== this.reset.newPassRep) {
      await this.showToast(await this.translate.get('home.profile.password.err.differ').toPromise());
      return;
    }

    this.httpClient.post(environment.apiUrl + '/v1/profile/change_pass', this.reset).subscribe(async () => {
      await this.showToast(await this.translate.get('home.profile.password.changed').toPromise());
    }, async (e) => {
      if (e.status === 409) {
        await this.showToast(await this.translate.get('home.profile.password.err.old_pass').toPromise());
      } else {
        await this.showToast(await this.translate.get('home.profile.password.err.generic').toPromise());
      }
    });
  }
}

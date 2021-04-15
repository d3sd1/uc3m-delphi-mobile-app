import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {User} from '../../user';
import {UserStorage} from '../../../core/storage/user.storage';
import {LoginUser} from '../../../core/consumer/login/login.user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'delphi-profile-password',
  templateUrl: './profile-password.page.html',
  styleUrls: ['./profile-password.page.scss'],
})
export class ProfilePasswordPage implements OnInit {

  user: User;
  reset = {
    currentPass: '',
    newPass: '',
    newPassRep: ''
  };

  constructor(
    private navCtrl: NavController,
    private authService: UserStorage,
    private toastController: ToastController,
    private httpClient: HttpClient) {
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
    if (this.reset.newPass !== this.reset.newPassRep) {
      await this.showToast('Las nuevas contraseñas no coinciden.');
      return;
    }

    this.httpClient.post(environment.apiUrl + '/v1/profile/change_pass', this.reset).subscribe(async () => {
      await this.showToast('Contraseña cambiada correctamente.');
    }, async (e) => {
      if (e.status === 409) {
        await this.showToast('La contraseña antigua no es correcta.');
      } else {
        await this.showToast('Error al cambiar contraseña.');
      }
    });
  }
}

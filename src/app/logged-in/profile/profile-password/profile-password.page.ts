import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'delphi-profile-password',
  templateUrl: './profile-password.page.html',
  styleUrls: ['./profile-password.page.scss'],
})
export class ProfilePasswordPage implements OnInit {

  reset;

  constructor(
    private navCtrl: NavController,
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
  }

  async goBack() {
    this.navCtrl.back();
  }

  async resetPass() {
    this.resetForm();
    if (this.reset.newPass !== this.reset.newPassRep) {
      this.showToast('Las nueva nueva contraseña no coincide en ambos input.');
      return;
    }
    if (this.reset.newPass === '' || this.reset.newPassRep === '' || this.reset.currentPass === '') {
      this.showToast('Por favor, rellena el formulario.').then(r => null);
      return;
    }

  }

  private async showToast(msg: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: msg,
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }
}

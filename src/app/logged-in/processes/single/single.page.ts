import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {UserStorage} from '../../../core/storage/user.storage';

@Component({
  selector: 'delphi-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {

  showExpertForm = false;
  invitationEmail = '';

  constructor(
    private toastController: ToastController,
    private navCtrl: NavController,
    public userStorage: UserStorage) {
  }

  ngOnInit() {
  }

  showExpertInvitation() {
    this.showExpertForm = true;
  }

  async sendExpertInvitation() {
    this.showExpertForm = false;
    this.invitationEmail = '';
    const toast = await this.toastController.create({
      message: 'Invitación enviada',
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
  }

  goBack() {
    this.navCtrl.back();
  }

}

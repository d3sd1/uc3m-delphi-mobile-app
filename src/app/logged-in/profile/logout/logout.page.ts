import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {UserConsumer} from '../../../core/consumer/user/user.consumer';

@Component({
  selector: 'delphi-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private userConsumer: UserConsumer, private navCtrl: NavController, private toastController: ToastController) {
  }


  async sendToast(msg) {
    const toast = await this.toastController.create({
      position: 'top',
      message: msg,
      duration: 2000
    });
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    await toast.present();
  }

  ngOnInit() {
    setTimeout(() => {
      this.userConsumer.doLogout();
      this.navCtrl.navigateBack('/logged-out/login').then(() => {
        this.sendToast('Desconexión satisfactoria').then();
      });
    }, 2000);
  }

}

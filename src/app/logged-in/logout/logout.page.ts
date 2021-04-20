import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {UserStorage} from '../../core/storage/user.storage';

@Component({
  selector: 'delphi-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private userStorage: UserStorage, private router: Router, private toastController: ToastController) {
  }


  async sendToast(msg) {
    const toast = await this.toastController.create({
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
      this.userStorage.logout().then(() => {
        this.router.navigateByUrl('/logged-out').then(() => {
          this.sendToast('Desconexión satisfactoria').then();
        });
      }).catch((e) => {
        console.error(e);
      });
    }, 2000);
  }

}

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

  constructor(private authenticationService: UserStorage, private router: Router, private toastController: ToastController) {
  }


  async sendToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    await toast.present();
  }

  ngOnInit() {
    setTimeout(() => {
      /*this.authenticationService.logout().then(() => {
        this.router.navigateByUrl('login').then(() => {
          this.sendToast('Desconexión satisfactoria').then();
        });
      }).catch(() => {

      });*/
    }, 2000);
  }

}

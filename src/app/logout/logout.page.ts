import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication-service';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'delphi-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router, private toastController: ToastController) {
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
      this.authenticationService.logout().then(() => {
        this.router.navigateByUrl('login').then(() => {
          this.sendToast('Desconexión satisfactoria').then();
        });
      }).catch(() => {

      });
    }, 2000);
  }

}

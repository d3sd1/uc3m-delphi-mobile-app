import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserConsumer} from '../../../core/consumer/user/user.consumer';
import {NotificationService} from '../../../core/service/notification.service';

@Component({
  selector: 'delphi-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private userConsumer: UserConsumer, private navCtrl: NavController, private ns: NotificationService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.userConsumer.doLogout().then(r => {
        this.navCtrl.navigateBack('/logged-out/login').then(() => {
          this.ns.showToast('Desconexión satisfactoria');
        });
      });
    }, 2000);
  }

}

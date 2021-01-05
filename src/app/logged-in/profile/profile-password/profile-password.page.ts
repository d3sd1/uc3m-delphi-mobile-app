import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {User} from '../../user';
import {UserStorage} from '../../../core/storage/user.storage';

@Component({
  selector: 'delphi-profile-password',
  templateUrl: './profile-password.page.html',
  styleUrls: ['./profile-password.page.scss'],
})
export class ProfilePasswordPage implements OnInit {

  user: User;

  constructor(
    private navCtrl: NavController,
    private authService: UserStorage) {
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
  }

  goBack() {
    this.navCtrl.back();
  }

  //TODO: must auth before saving changes


}

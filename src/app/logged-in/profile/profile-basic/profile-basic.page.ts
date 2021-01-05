import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserStorage} from '../../../core/storage/user.storage';
import {User} from '../../user';

@Component({
  selector: 'delphi-profile-basic',
  templateUrl: './profile-basic.page.html',
  styleUrls: ['./profile-basic.page.scss'],
})
export class ProfileBasicPage implements OnInit {

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

  // TODO: must auth before saving changes

}

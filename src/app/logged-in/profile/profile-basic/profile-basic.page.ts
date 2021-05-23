import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {User} from '../../user';

@Component({
  selector: 'delphi-profile-basic',
  templateUrl: './profile-basic.page.html',
  styleUrls: ['./profile-basic.page.scss'],
})
export class ProfileBasicPage {

  user: User;

  constructor(
    private navCtrl: NavController) {
  }

  async goBack() {
    this.navCtrl.back();
  }

  // TODO: must auth before saving changes

}

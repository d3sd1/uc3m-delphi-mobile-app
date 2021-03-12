import { Component, OnInit } from '@angular/core';
import {User} from '../../user';
import {NavController} from '@ionic/angular';
import {UserStorage} from '../../../core/storage/user.storage';

@Component({
  selector: 'delphi-cv',
  templateUrl: './cv.page.html',
  styleUrls: ['./cv.page.scss'],
})
export class CvPage implements OnInit {

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

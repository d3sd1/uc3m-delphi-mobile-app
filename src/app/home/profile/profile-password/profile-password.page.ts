import {Component, OnInit} from '@angular/core';
import {User} from '../../../../model/user';
import {NavController} from '@ionic/angular';
import {AuthenticationService} from '../../../../services/authentication-service';

@Component({
  selector: 'delphi-profile-password',
  templateUrl: './profile-password.page.html',
  styleUrls: ['./profile-password.page.scss'],
})
export class ProfilePasswordPage implements OnInit {

  user: User;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService) {
  }

  async ngOnInit() {
    this.user = await this.authService.getUser();
  }

  goBack() {
    this.navCtrl.back();
  }

  //TODO: must auth before saving changes


}

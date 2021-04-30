import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserStorage} from '../../core/storage/user.storage';
import {User} from '../user';

@Component({
  selector: 'delphi-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {
  user: User = new User();

  reset = {
    currentPass: '',
    newPass: '',
    newPassRep: ''
  };

  @ViewChild('mySlider') slides: IonSlides;

  constructor(private userService: UserService, private router: Router, private storage: Storage,
              private httpClient: HttpClient, private userStorage: UserStorage) {
  }

  async ngOnInit() {
    this.user = await this.userStorage.getUser();
  }

  async setupAccount() {
    await this.httpClient.post(environment.apiUrl + '/v1/profile/setup', this.user);
    await this.userStorage.setUser(this.user);
    await this.slides.slideNext();
  }

  async setupPassword() {
    this.reset.currentPass = this.user.email; // TODO CHANGE THIS TO RANDOM PASS AND ALLOW TO CHANGE ONLY IF IT'S FIRST TIME ONBOARDING
    this.reset.newPassRep = this.reset.newPass; // TODO CHANGE THIS TO RANDOM PASS AND ALLOW TO CHANGE ONLY IF IT'S FIRST TIME ONBOARDING
    await this.httpClient.post(environment.apiUrl + '/v1/profile/change_pass', this.reset);
    await this.userStorage.setUser(this.user);
    await this.slides.slideNext();
  }

  async swipeNext() {
    await this.slides.slideNext();
  }

  async endSwiper() {
    const user = await this.userStorage.getUser();
    user.needsOnboard = false;
    await this.userStorage.setUser(user);
    await this.httpClient.post(environment.apiUrl + '/v1/profile/onboard/false', {});
    await this.router.navigateByUrl('/logged-in/home/menu');
  }

}

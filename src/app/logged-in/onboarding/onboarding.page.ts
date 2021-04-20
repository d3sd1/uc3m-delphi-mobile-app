import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {UserService} from './user.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserStorage} from '../../core/storage/user.storage';

@Component({
  selector: 'delphi-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  @ViewChild('mySlider') slides: IonSlides;

  constructor(private userService: UserService, private router: Router, private  storage: Storage,
              private httpClient: HttpClient, private userStorage: UserStorage) {
  }

  ngOnInit() {
  }

  swipeNext() {
    this.slides.slideNext();
  }

  async endSwiper() {
    const user = await this.userStorage.getUser();
    user.needsOnboard = false;
    await this.userStorage.setUser(user);
    await this.httpClient.post(environment.apiUrl + '/v1/profile/onboard/false',{});
    await this.router.navigateByUrl('/logged-in/home/menu');
  }

}

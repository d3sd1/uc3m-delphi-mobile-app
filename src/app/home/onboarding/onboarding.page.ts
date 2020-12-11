import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {UserService} from '../../../mock/user.service';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'delphi-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {

  @ViewChild('mySlider') slides: IonSlides;

  constructor(private userService: UserService, private router: Router, private  storage: Storage) {
  }

  ngOnInit() {
  }

  swipeNext() {
    this.slides.slideNext();
  }

  endSwiper() {
    this.userService.setOnboardingStatus(false).then(async () => {
      await this.storage.set('onboard', false);
    }).catch((e) => {
      console.error(e);
    }).finally(async () => {
      await this.router.navigateByUrl('/home/menu');
    });
  }

}

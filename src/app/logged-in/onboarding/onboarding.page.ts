import {Component, ViewChild} from '@angular/core';
import {IonSlides, NavController, ToastController, ViewDidEnter} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {User} from '../../core/model/user';
import {TranslateService} from '@ngx-translate/core';
import {UserConsumer} from '../../core/consumer/user/user.consumer';

@Component({
  selector: 'delphi-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements ViewDidEnter {
  user: User;

  reset = {
    currentPass: '',
    newPass: '',
    newPassRep: ''
  };

  @ViewChild('mySlider') slides: IonSlides;

  constructor(private router: Router, private storage: Storage,
              private httpClient: HttpClient,
              private toastController: ToastController,
              private translate: TranslateService,
              private userConsumer: UserConsumer,
              private navCtrl: NavController,
              private route: ActivatedRoute) {
    this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
      if(!this.user.needsOnboard) {
        this.router.navigateByUrl('/logged-in/menu/processes/list').then(r => null);
      }
    });
  }

  async ionViewDidEnter() {

  }

  async setupAccount() {
    if (this.user.name === '' ||
      this.user.surnames === '' ||
      this.user.name === null ||
      this.user.surnames === null ||
      this.user.name === undefined ||
      this.user.surnames === undefined) {
      this.showToast('Nombre incorrecto.');
      return;
    }
    this.slides.slideNext();
  }

  async swipeNext() {
    this.slides.slideNext();
  }

  endSwiper() {
    this.userConsumer.updateUserOnboarding(this.user.name, this.user.surnames);
    this.router.navigateByUrl('/logged-in/menu').then(r => null);
  }

  onBoardingFinished() {
    console.log('onboard finished')
    // @ts-ignore
    if (this.user.needsOnboard === 'false' || this.user.needsOnboard === false) {
      this.navCtrl.navigateForward('/logged-in/menu').then(r => null);
    }
  }

  private async showToast(transKey: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: transKey,
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }

}

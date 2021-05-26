import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, NavController, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
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
export class OnboardingPage implements OnInit {
  user: User = new User();

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
              private navCtrl: NavController) {
  }

  async ngOnInit() {
    this.user = (await this.userConsumer.getUser()).getValue();
    await this.onBoardingFinished();
  }

  async setupAccount() {
    if (this.user.name === '' ||
      this.user.surnames === '' ||
      this.user.name === null ||
      this.user.surnames === null ||
      this.user.name === undefined ||
      this.user.surnames === undefined) {
      await this.showToast('home.onboarding.setup.error.name');
      return;
    }
    await this.userConsumer.updateNameSurnames(
      this.user.name,
      this.user.surnames
    );
    await this.slides.slideNext();
  }

  async setupPassword() {
    if (this.reset.newPass === null ||
      this.reset.newPassRep === null ||
      this.reset.newPass === '' ||
      this.reset.newPassRep === '' ||
      this.reset.newPass === undefined ||
      this.reset.newPassRep === undefined) {
      await this.showToast('home.onboarding.setup.error.password_empty');
      return;
    } else if (this.reset.newPass !== this.reset.newPassRep) {
      await this.showToast('home.onboarding.setup.error.password_matching');
      return;
    }

    await this.userConsumer.changePass(this.reset);
    await this.slides.slideNext();
  }

  async swipeNext() {
    await this.slides.slideNext();
  }

  async endSwiper() {
    await this.userConsumer.updateOnboard(false);
    await this.router.navigateByUrl('/logged-in/menu');
  }

  async onBoardingFinished() {
    if (!this.user.needsOnboard) {
      await this.navCtrl.navigateForward('/logged-in/menu');
    }
  }

  private async showToast(transKey: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: await this.translate.get(transKey).toPromise(),
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }

}

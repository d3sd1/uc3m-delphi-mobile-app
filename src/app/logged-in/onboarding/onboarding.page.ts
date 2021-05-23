import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides, ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../user';
import {TranslateService} from '@ngx-translate/core';

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
              private translate: TranslateService) {
  }

  async ngOnInit() {
   //TODO  this.user = await this.userStorage.getUser();
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
    await this.httpClient.post(environment.apiUrl + '/v1/profile/setup', this.user).toPromise();
   //TODO await this.userStorage.setUser(this.user);
    await this.slides.slideNext();
  }

  async setupPassword() {
    if(this.reset.newPass === null ||
    this.reset.newPassRep === null ||
    this.reset.newPass === '' ||
    this.reset.newPassRep === '' ||
    this.reset.newPass === undefined ||
    this.reset.newPassRep === undefined) {
      await this.showToast('home.onboarding.setup.error.password_empty');
      return;
    }
    else if(this.reset.newPass !== this.reset.newPassRep) {
      await this.showToast('home.onboarding.setup.error.password_matching');
      return;
    }
    await this.httpClient.post(environment.apiUrl + '/v1/profile/change_pass', this.reset).toPromise();

    await this.slides.slideNext();
  }

  async swipeNext() {
    await this.slides.slideNext();
  }

  async endSwiper() {
    this.user.needsOnboard = false;
   //TODO await this.userStorage.setUser(this.user);
    console.log(this.user)
    await this.httpClient.post(environment.apiUrl + '/v1/profile/onboard?status=false', {}).toPromise();
    await this.router.navigateByUrl('/logged-in/home/menu');
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

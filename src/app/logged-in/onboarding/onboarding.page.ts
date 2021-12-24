import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonSlides, NavController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {User} from '../../core/model/user';
import {TranslateService} from '@ngx-translate/core';
import {UserConsumer} from '../user.consumer';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../core/service/notification.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'delphi-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit, OnDestroy {
  user: User;

  reset = {
    currentPass: '',
    newPass: '',
    newPassRep: ''
  };
  userSubscription: Subscription;
  routeSubscription: Subscription;
  processSubscription: Subscription;

  @ViewChild('mySlider') slides: IonSlides;

  constructor(private storage: Storage,
              private ns: NotificationService,
              private toastController: ToastController,
              private translate: TranslateService,
              private userConsumer: UserConsumer,
              private navCtrl: NavController,
              private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
          if (user === null) {
            return;
          }
          this.user = user;
          if (!this.user.needsOnboard) {
            this.navCtrl.navigateForward('/logged-in/menu/processes/list').then(r => null);
          }
          this.user.name = '';
          this.user.surnames = '';
        });
      });
  }

  setupAccount() {
    if (this.user.name === '' ||
      this.user.surnames === '' ||
      this.user.name === null ||
      this.user.surnames === null ||
      this.user.name === undefined ||
      this.user.surnames === undefined) {
      this.ns.showToast('Nombre incorrecto.');
      return;
    }
    this.slides.slideNext();
  }

  swipeNext() {
    this.slides.slideNext();
  }

  endSwiper() {
    this.userConsumer.updateUserOnboarding(this.user.name, this.user.surnames);
    this.navCtrl.navigateForward('/logged-in/menu').then(r => null);
  }

  onBoardingFinished() {
    // @ts-ignore
    if (this.user.needsOnboard === 'false' || this.user.needsOnboard === false) {
      this.navCtrl.navigateForward('/logged-in/menu').then(r => null);
    }
  }

  ngOnDestroy(): void {
    this.slides.slideTo(0).then(r => null);

    this.user = undefined;
    this.reset.currentPass = '';
    this.reset.newPass = '';
    this.reset.newPassRep = '';
    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (!this.routeSubscription.closed) {
      this.routeSubscription.unsubscribe();
    }
    if (!this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
  }

}

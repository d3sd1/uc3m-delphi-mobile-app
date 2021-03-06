import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonSlides, NavController, ToastController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {UserConsumer} from '../user.consumer';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../core/service/notification.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'delphi-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit, OnDestroy {

  onboardingForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(15)]],
    lastName: ['', [Validators.required, Validators.maxLength(15)]],
  });

  userSubscription: Subscription;
  routeSubscription: Subscription;
  processSubscription: Subscription;

  @ViewChild('onboardingSlides') onboardingSlides: IonSlides;

  constructor(private storage: Storage,
              private ns: NotificationService,
              private toastController: ToastController,
              private fb: FormBuilder,
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
          if (!user.needsOnboard) {
            this.navCtrl.navigateForward('/logged-in/menu/processes/list').then(null);
          }
          this.onboardingForm.get('firstName').setValue('');
          this.onboardingForm.get('lastName').setValue('');
        });
      });
  }

  setupAccount() {
    if (this.onboardingForm.get('firstName').value === ''
      || this.onboardingForm.get('lastName').value === ''
      || this.onboardingForm.get('firstName').value.trim().length === 0
      || this.onboardingForm.get('lastName').value.trim().length === 0) {
      this.ns.showToast('Introduce tu nombre y apellidos.');
      return;
    }
    if (this.onboardingSlides) {
      this.onboardingSlides.slideNext().then(null);
    }
  }

  swipeNext() {
    if (this.onboardingSlides) {
      this.onboardingSlides.slideNext().then(null);
    }
  }

  endSwiper() {
    this.userConsumer.updateUserOnboarding(this.onboardingForm.get('firstName').value, this.onboardingForm.get('lastName').value);
  }

  ngOnDestroy(): void {
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (this.routeSubscription && !this.routeSubscription.closed) {
      this.routeSubscription.unsubscribe();
    }
    if (this.processSubscription && !this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    if (this.onboardingForm) {
      this.onboardingForm.reset();
    }
  }

}

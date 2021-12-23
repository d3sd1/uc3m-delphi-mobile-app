import {Component} from '@angular/core';
import {LoadingController, NavController, ViewDidEnter, ViewDidLeave} from '@ionic/angular';
import {UserConsumer} from '../../logged-in/user.consumer';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../core/service/notification.service';

@Component({
  selector: 'delphi-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements ViewDidEnter, ViewDidLeave {
  // Form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  // Subscriptions
  userSubscription: Subscription;

  constructor(private userConsumer: UserConsumer,
              private navCtrl: NavController,
              private loadingController: LoadingController,
              private ns: NotificationService,
              private fb: FormBuilder) {
  }

  ionViewDidEnter(): void {
    this.redirectHomeIfConnected();
  }

  redirectHomeIfConnected() {
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      if (user === null) {
        return;
      }
      this.navCtrl.navigateForward('/logged-in').then(() => null);
    });
  }

  login() {
    this.ns.showToast('Conectando...');
    this.userConsumer.doLogin(this.loginForm.value).then((sucMessage: string) => {
      this.ns.showToast(sucMessage);
      this.navCtrl.navigateForward('/logged-in').then(() => null);
    }).catch((errMessage: string) => {
      this.ns.showToast(errMessage);
    });
  }


  ionViewDidLeave(): void {
    this.loginForm.reset();
    this.userSubscription.unsubscribe();
  }

}

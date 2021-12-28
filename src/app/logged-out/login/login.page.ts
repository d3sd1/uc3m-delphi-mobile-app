import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController, NavController} from '@ionic/angular';
import {UserConsumer} from '../../logged-in/user.consumer';
import {FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../core/service/notification.service';
import {ActivatedRoute} from '@angular/router';
import {WsService} from '../../core/service/ws/ws.service';

@Component({
  selector: 'delphi-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
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
              private fb: FormBuilder,
              private wsService: WsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
        if (user === null) {
          return;
        }
        this.navCtrl.navigateForward('/logged-in').then(this.ngOnDestroy);
      });
      this.ns.removeAlert();
    });
  }

  login() {
    this.ns.showToast('Conectando...');
    this.userConsumer.doLogin(this.loginForm.value).then((sucMessage: string) => {
      this.navCtrl.navigateForward('/logged-in').then(() => {
        this.ns.showToast(sucMessage);
        this.ngOnDestroy();
      });
    }).catch((errMessage: string) => {
      this.ns.showToast(errMessage);
      this.loginForm.get('password').setValue('');
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (this.loginForm) {
      this.loginForm.reset();
    }
  }

}

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
      this.redirectHomeIfConnected();
      this.ns.removeAlert();
    });
  }

  redirectHomeIfConnected() {
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      if (user === null) {
        return;
      }
      this.navCtrl.navigateForward('/logged-in').then(() => this.ngOnDestroy());
    });
  }

  login() {
    this.ns.showToast('Conectando...');
    this.userConsumer.doLogin(this.loginForm.value).then((sucMessage: string) => {
      console.log('login OK!!')
      this.navCtrl.navigateForward('/logged-in').then(() => {
        this.ns.showToast(sucMessage);
        this.ngOnDestroy();
      });
    }).catch((errMessage: string) => {
      this.ns.showToast(errMessage);
    });
  }

  ngOnDestroy(): void {
    this.loginForm.reset();
    this.userSubscription.unsubscribe();
  }

}

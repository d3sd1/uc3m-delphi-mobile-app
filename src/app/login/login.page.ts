import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication-service';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'delphi-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: '',
    rememberMe: false
  };
  loading;

  constructor(private authService: AuthenticationService, private router: Router, private loadingController: LoadingController) {
  }

  async ngOnInit() {
    this.authService.isAuthenticated().then((authenticated) => {
      if (authenticated) {
        this.router.navigateByUrl('home').then(r => {
          this.user.email = '';
          this.user.password = '';
          this.user.rememberMe = false;
        });
      }
    }).catch(e => {

    });
  }

  async doLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...',
      duration: 2000
    });
    await this.loading.present();
  }

  async login() {
    await this.doLoading();
    this.authService.login(this.user).then((resp) => {
      console.log('USER LOGIN RES ->  ', resp);
      this.router.navigateByUrl('home').then(r => {
        this.user.email = '';
        this.user.password = '';
        this.user.rememberMe = false;
      });
    }).catch((err) => {
      console.log('USER LOGIN RESerr ->  ', err);
    }).finally(() => {
      this.loading.dismiss();
    });
  }

}

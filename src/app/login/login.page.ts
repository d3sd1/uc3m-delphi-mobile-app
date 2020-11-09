import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../services/authentication-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user = {
    email: '',
    password: '',
    rememberMe: false
  };

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user).then((resp) => {
      this.router.navigateByUrl('home').then(r => {
        this.user.email = '';
        this.user.password = '';
        this.user.rememberMe = false;
      });
    }).catch((err) => {
      console.log(err);
    });
  }

}

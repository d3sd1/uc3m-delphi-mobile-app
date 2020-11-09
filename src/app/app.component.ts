import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication-service';
import {TouchID} from '@ionic-native/touch-id/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private touchId: TouchID
  ) {
    this.initializeApp();
  }

  iosBiometricLogin() {
    this.touchId.isAvailable()
      .then(
        res => console.log('TouchID is available!'),
        err => console.error('TouchID is not available', err)
      );

    this.touchId.verifyFingerprint('Scan your fingerprint please')
      .then(
        res => console.log('Ok', this.router.navigate(['home'])),
        err => console.error('Error', err)
      );

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();


      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.iosBiometricLogin();
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }
}

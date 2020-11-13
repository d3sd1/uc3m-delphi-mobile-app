import {Component} from '@angular/core';

import {LoadingController, Platform} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';
import {AuthenticationService} from './services/authentication-service';
import {TouchID} from '@ionic-native/touch-id/ngx';
import {InitService} from './startup/initializer/init.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appLoading = true;
  minLoadMs = 6000;
  initialMs = 0;
  endMs = 0;
  loading;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private authenticationService: AuthenticationService,
    private router: Router,
    private touchId: TouchID,
    private initApp: InitService,
    private loadingController: LoadingController
  ) {
    this.initializeApp();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Un momento...',
      duration: 2000
    });
    await this.loading.present();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.initialMs = (new Date()).getMilliseconds();
      this.statusBar.styleDefault();
      this.initApp.doInit().then(async (success) => {
        if (success) {
          this.endMs = (new Date()).getMilliseconds();
          this.sucessLoading();
        }
      });
    });
  }

  sucessLoading() {
    let remainingMs = this.minLoadMs;
    const msElapsed = this.endMs - this.initialMs;
    if (msElapsed > this.minLoadMs) {
      remainingMs = 0;
    } else if (msElapsed < this.minLoadMs) {
      remainingMs = this.minLoadMs - msElapsed;
    }
    setTimeout(async () => {
      await this.presentLoading();
      this.appLoading = false;
      this.router.navigate(['login']).then(() => {
        this.loading.dismiss();
      });
    }, remainingMs);
  }

}

import {Component} from '@angular/core';

@Component({
  selector: 'delphi-root',
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>`
})
export class EntrypointComponent {
  /*
    constructor(
      private platform: Platform,
      private themeService: ThemeService,
      private loaderService: SplashScreenService
    ) {
      this.themeListenerInit();
      this.initializeApp();
    }

    private themeListenerInit() {
      this.themeService.addDarkThemeHandler();
      this.themeService.addLightThemeHandler();
    }


    initializeApp() {
     /* this.platform.ready().then(() => {
        this.loaderService.initialize();
      });
    }*/


}

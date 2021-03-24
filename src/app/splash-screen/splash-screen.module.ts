import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SplashScreenComponent} from './splash-screen.component';
import {SplashScreenRoutingModule} from './splash-screen-routing.module';
import {IonicModule} from '@ionic/angular';
import {ApiLoaderPage} from './api-loader/api-loader.page';
import {HttpClientModule} from '@angular/common/http';
import {PermissionsLoaderPage} from './permissions-loader/permissions-loader.page';

import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    SplashScreenComponent,
    ApiLoaderPage,
    PermissionsLoaderPage
  ],
  imports: [
    SplashScreenRoutingModule,
    CommonModule,
    IonicModule,
    HttpClientModule,
    TranslateModule
  ],
  providers: [
    StatusBar,
    Geolocation
  ]
})
export class SplashScreenModule {
}

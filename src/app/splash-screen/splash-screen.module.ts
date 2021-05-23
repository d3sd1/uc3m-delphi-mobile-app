import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SplashScreenComponent} from './splash-screen.component';
import {SplashScreenRoutingModule} from './splash-screen-routing.module';
import {IonicModule, IonProgressBar} from '@ionic/angular';
import {ApiLoaderPage} from './api-loader/api-loader.page';
import {HttpClientModule} from '@angular/common/http';
import {PermissionsLoaderPage} from './permissions-loader/permissions-loader.page';

import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {InitLoaderPage} from './init-loader/init-loader.page';
import {WsLoaderPage} from './ws-loader/ws-loader.page';

@NgModule({
  declarations: [
    SplashScreenComponent,
    ApiLoaderPage,
    PermissionsLoaderPage,
    InitLoaderPage,
    WsLoaderPage
  ],
  imports: [
    SplashScreenRoutingModule,
    CommonModule,
    IonicModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    Geolocation,
    IonProgressBar
  ]
})
export class SplashScreenModule {
}

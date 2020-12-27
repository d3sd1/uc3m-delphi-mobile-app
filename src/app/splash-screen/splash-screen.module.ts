import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SplashScreenComponent} from './splash-screen.component';
import {SplashScreenRoutingModule} from './splash-screen-routing.module';
import {IonicModule} from '@ionic/angular';
import {ApiLoaderComponent} from './api-loader/api-loader.component';
import {HttpClientModule} from '@angular/common/http';
import {PermissionLoaderComponent} from './permission-loader/permission-loader.component';

import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [
    SplashScreenComponent,
    ApiLoaderComponent,
    PermissionLoaderComponent
  ],
  imports: [
    SplashScreenRoutingModule,
    CommonModule,
    IonicModule,
    HttpClientModule,
  ],
  providers: [
    StatusBar,
    Geolocation
  ]
})
export class SplashScreenModule {
}

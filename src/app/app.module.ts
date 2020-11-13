import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IonicStorageModule} from '@ionic/storage';
import {HttpClientModule} from '@angular/common/http';
import {TouchID} from '@ionic-native/touch-id/ngx';
import {SplashScreenComponent} from './startup/splash-screen/splash-screen.component';
import {InitService} from './startup/initializer/init.service';
import {ApiService} from './startup/initializer/api/api.service';

@NgModule({
  declarations: [AppComponent, SplashScreenComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    HttpClientModule],
  providers: [
    StatusBar,
    SplashScreenComponent,
    TouchID,
    InitService,
    ApiService,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

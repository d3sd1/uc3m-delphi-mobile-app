import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {EntrypointRoutingModule} from './entrypoint-routing.module';
import {EntrypointPage} from './entrypoint-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IonicStorageModule} from '@ionic/storage';
import {DelphiCoreModule} from './core/delphi-core.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {LoggedInModule} from './logged-in/logged-in.module';
import {LoggedOutModule} from './logged-out/logged-out.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {SplashScreenPage} from './splash-screen/splash-screen.page';
import {NotificationService} from './core/service/notification.service';
import {JwtService} from './core/service/jwt.service';
import {WsService} from './core/service/ws/ws.service';

@NgModule({
  declarations: [
    EntrypointPage,
    SplashScreenPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    EntrypointRoutingModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    DelphiCoreModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    LoggedInModule,
    LoggedOutModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    TranslateService,
    TranslateStore,
    NotificationService,
    JwtService,
    WsService
  ],
  bootstrap: [EntrypointPage],
  exports: [
    DelphiCoreModule,
    TranslateModule
  ]
})
export class EntrypointModule {
}

/**
 * Required for AOT compilation.
 */

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

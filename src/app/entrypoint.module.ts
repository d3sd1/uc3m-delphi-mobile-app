import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {EntrypointRoutingModule} from './entrypoint-routing.module';
import {EntrypointComponent} from './entrypoint.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IonicStorageModule} from '@ionic/storage';
import {DelphiCoreModule} from './core/delphi-core.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {LoggedInModule} from './logged-in/logged-in.module';
import {LoggedOutModule} from './logged-out/logged-out.module';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LoggedInGuard} from './core/router/guard/logged-in.guard';
import {LoggedOutGuard} from './core/router/guard/logged-out.guard';
import {SplashScreenPage} from './splash-screen/splash-screen.page';
import {ToastService} from './core/service/toast.service';

@NgModule({
  declarations: [
    EntrypointComponent,
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
    LoggedInGuard,
    LoggedOutGuard,
    ToastService
  ],
  bootstrap: [EntrypointComponent],
  exports: [
    DelphiCoreModule,
    TranslateModule
  ]
})
export class EntrypointModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

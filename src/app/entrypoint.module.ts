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
import {TranslateModule} from '@ngx-translate/core';
import {UserConsumer} from './core/consumer/user/user.consumer';
import {ProcessConsumer} from './core/consumer/process/process.consumer';

@NgModule({
  declarations: [EntrypointComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    EntrypointRoutingModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    DelphiCoreModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    UserConsumer
  ],
  bootstrap: [EntrypointComponent],
  exports: [
    TranslateModule,
    DelphiCoreModule
  ]
})
export class EntrypointModule {
}

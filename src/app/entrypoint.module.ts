import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {EntrypointRoutingModule} from './entrypoint-routing.module';
import {EntrypointComponent} from './entrypoint.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
  declarations: [EntrypointComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    EntrypointRoutingModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  bootstrap: [EntrypointComponent]
})
export class EntrypointModule {
}

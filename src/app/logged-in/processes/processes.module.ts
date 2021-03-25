import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProcessesPage} from './processes.page';

import {ProcessesPageRoutingModule} from './processes-routing.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {EmptyPageModule} from './empty/empty.module';
import {LoadingPageModule} from './loading/loading.module';
import {ListPageModule} from './list/list.module';
import {SinglePage} from './single/single.page';
import {ProcessService} from './process.service';
import {IonicRatingModule} from 'ionic4-rating';
import {CountdownModule} from 'ngx-countdown';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProcessesPageRoutingModule,
    EmptyPageModule,
    LoadingPageModule,
    ListPageModule,
    IonicRatingModule,
    CountdownModule,
    TranslateModule
  ],
  declarations: [ProcessesPage, SinglePage],
  providers: [
    Geolocation,
    ProcessService
  ],

})
export class ProcessesPageModule {
}

import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProcessesPage} from './processes.page';

import {ProcessesPageRoutingModule} from './processes-routing.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LoadingPageModule} from './loading/loading.module';
import {ListPageModule} from './list/list.module';
import {SinglePage} from './single/single.page';
import {ProcessService} from './process.service';
import {IonicRatingModule} from 'ionic4-rating';
import {CountdownModule} from 'ngx-countdown';
import {TranslateModule} from '@ngx-translate/core';
import {ModifyPage} from './modify/modify.page';
import {EmptyPage} from './list/empty/empty.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProcessesPageRoutingModule,
    LoadingPageModule,
    ListPageModule,
    IonicRatingModule,
    CountdownModule,
    TranslateModule
  ],
  declarations: [ProcessesPage, SinglePage, ModifyPage],
  providers: [
    Geolocation,
    ProcessService
  ],

})
export class ProcessesPageModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ListPageRoutingModule} from './list-routing.module';

import {ListPage} from './list.page';
import {CountdownModule} from 'ngx-countdown';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    CountdownModule,
    TranslateModule
  ],
  exports: [
    ListPage
  ],
  declarations: [ListPage]
})
export class ListPageModule {
}

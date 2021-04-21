import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ListPageRoutingModule} from './list-routing.module';

import {ListPage} from './list.page';
import {CountdownModule} from 'ngx-countdown';
import {TranslateModule} from '@ngx-translate/core';
import {EmptyPage} from './empty/empty.page';

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
        ListPage,
        EmptyPage
    ],
  declarations: [ListPage, EmptyPage]
})
export class ListPageModule {
}

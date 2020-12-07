import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './home-routing.module';

import {HomePage} from './home.page';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  declarations: [HomePage]
})
export class TabsPageModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {LoadingPageRoutingModule} from './chat-loading-routing.module';

import {ChatLoadingPage} from './chat-loading.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingPageRoutingModule
  ],
  exports: [
    ChatLoadingPage
  ],
  declarations: [ChatLoadingPage]
})
export class LoadingPageModule {
}

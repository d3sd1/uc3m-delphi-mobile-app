import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './home-routing.module';

import {HomePage} from './home.page';
import {ChatService} from './chat/chat.service';
import {TranslateModule} from '@ngx-translate/core';
import {LogoutPage} from './profile/logout/logout.page';
import {OnboardingPage} from './onboarding/onboarding.page';
import {UserConsumer} from '../core/consumer/user/user.consumer';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TranslateModule,
  ],
  providers: [
    ChatService
  ],
  declarations: [HomePage, LogoutPage, OnboardingPage],
  exports: [
    TranslateModule
  ]
})
export class TabsPageModule {
}

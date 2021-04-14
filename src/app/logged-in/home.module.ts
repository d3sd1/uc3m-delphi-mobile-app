import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TabsPageRoutingModule} from './home-routing.module';

import {HomePage} from './home.page';
import {ChatService} from './chat/chat.service';
import {UserStorage} from '../core/storage/user.storage';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    TranslateModule
  ],
  providers: [
    ChatService,
    UserStorage
  ],
  declarations: [HomePage]
})
export class TabsPageModule {
}

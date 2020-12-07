import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChatPage} from './chat.page';

import {ChatPageRoutingModule} from './chat-routing.module';
import {ChatListComponent} from './chat-list/chat-list.component';
import {ChatEmptyPage} from './chat-empty/chat-empty.page';
import {LoadingPageModule} from './chat-loading/chat-loading.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatPageRoutingModule,
    LoadingPageModule,

  ],
  providers: [],
  declarations: [ChatPage, ChatListComponent, ChatEmptyPage]
})
export class ChatPageModule {
}

import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChatPage} from './chat.page';

import {ChatPageRoutingModule} from './chat-routing.module';
import {ChatListComponent} from './chat-list/chat-list.component';
import {ChatEmptyPage} from './chat-empty/chat-empty.page';
import {LoadingPageModule} from './chat-loading/chat-loading.module';
import {ChatConversationLoadingPage} from './chat-conversation/chat-conversation-loading/chat-conversation-loading.page';
import {ChatConversationComponent} from './chat-conversation/chat-conversation.component';
import {ChatService} from './chat.service';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatPageRoutingModule,
    LoadingPageModule,
    TranslateModule
  ],
  providers: [

  ],
  declarations: [ChatPage, ChatListComponent, ChatEmptyPage, ChatConversationLoadingPage, ChatConversationComponent]
})
export class ChatPageModule {
}

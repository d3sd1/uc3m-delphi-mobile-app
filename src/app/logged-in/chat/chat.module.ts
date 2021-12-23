import {IonicModule, NavParams} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChatPage} from './chat.page';

import {ChatPageRoutingModule} from './chat-routing.module';
import {ChatListPage} from './chat-list/chat-list-page.component';
import {ChatEmptyPage} from './chat-list/chat-list-empty/chat-empty.page';
import {ChatConversationLoadingPage} from './chat-conversation/chat-conversation-loading/chat-conversation-loading.page';
import {ChatConversationPage} from './chat-conversation/chat-conversation-page.component';
import {TranslateModule} from '@ngx-translate/core';
import {RelativeTime} from './relative-time.pipe';
import {EmojiPickerPage} from './chat-conversation/emoji-picker/emoji-picker';
import {EmojiProvider} from './chat-conversation/emoji-picker/emoji-provider';
import {ChatLoadingPage} from './chat-list/chat-list-loading/chat-loading.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ChatPageRoutingModule,
    TranslateModule
  ],
  providers: [
    NavParams,
    EmojiProvider
  ],
  declarations: [
    ChatPage,
    ChatListPage,
    ChatEmptyPage,
    ChatConversationLoadingPage,
    ChatConversationPage,
    RelativeTime,
    EmojiPickerPage,
    ChatLoadingPage
  ]
})
export class ChatPageModule {
}

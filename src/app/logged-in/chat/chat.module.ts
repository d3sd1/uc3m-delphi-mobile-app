import {IonicModule, NavParams} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ChatPage} from './chat.page';

import {ChatPageRoutingModule} from './chat-routing.module';
import {ChatListComponent} from './chat-list/chat-list.component';
import {ChatEmptyPage} from './chat-empty/chat-empty.page';
import {ChatConversationLoadingPage} from './chat-conversation/chat-conversation-loading/chat-conversation-loading.page';
import {ChatConversationPage} from './chat-conversation/chat-conversation-page.component';
import {TranslateModule} from '@ngx-translate/core';
import {RelativeTime} from './relative-time.pipe';
import {EmojiPickerComponent} from './chat-conversation/emoji-picker/emoji-picker';
import {EmojiProvider} from './chat-conversation/emoji-picker/emoji-provider';
import {ChatLoadingPage} from './chat-loading/chat-loading.page';
import {CurrentChatResolver} from '../../core/router/resolver/current-chat.resolver';

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
    EmojiProvider,
    CurrentChatResolver
  ],
  declarations: [
    ChatPage,
    ChatListComponent,
    ChatEmptyPage,
    ChatConversationLoadingPage,
    ChatConversationPage,
    RelativeTime,
    EmojiPickerComponent,
    ChatLoadingPage
  ]
})
export class ChatPageModule {
}

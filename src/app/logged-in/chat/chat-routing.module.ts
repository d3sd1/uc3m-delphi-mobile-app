import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatPage} from './chat.page';
import {ChatConversationPage} from './chat-conversation/chat-conversation-page.component';
import {CurrentProcessResolver} from '../../core/router/resolver/current-process.resolver';
import {CurrentChatResolver} from '../../core/router/resolver/current-chat.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ChatPage,
  },
  {
    path: 'conversation/:chatId',
    component: ChatConversationPage,
    resolve: {
      current_chat: CurrentChatResolver
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatPageRoutingModule {
}

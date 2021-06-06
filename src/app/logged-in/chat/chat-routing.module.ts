import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ChatPage} from './chat.page';
import {ChatConversationComponent} from './chat-conversation/chat-conversation.component';

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
    component: ChatConversationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatPageRoutingModule {
}

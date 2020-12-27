import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ChatLoadingPage} from './chat-loading.page';

const routes: Routes = [
  {
    path: '',
    component: ChatLoadingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingPageRoutingModule {
}

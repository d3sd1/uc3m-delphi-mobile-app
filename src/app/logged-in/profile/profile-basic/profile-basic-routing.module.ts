import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ProfileBasicPage} from './profile-basic.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileBasicPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileBasicPageRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePage} from './profile.page';
import {ProfilePasswordPage} from './profile-password/profile-password.page';
import {ProfileBasicPage} from './profile-basic/profile-basic.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
  {
    path: 'basic',
    component: ProfileBasicPage
  },
  {
    path: 'password',
    component: ProfilePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePageRoutingModule {
}

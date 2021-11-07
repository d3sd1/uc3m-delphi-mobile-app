import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePage} from './profile.page';
import {ProfilePasswordPage} from './profile-password/profile-password.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    resolve: {
    },
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


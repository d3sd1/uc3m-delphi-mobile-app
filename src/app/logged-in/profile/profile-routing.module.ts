import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePage} from './profile.page';
import {ProfilePasswordPage} from './profile-password/profile-password.page';
import {UserResolver} from '../../core/router/resolver/user.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    resolve: {
      user: UserResolver,
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


import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePage} from './profile.page';
import {LogoutPage} from './logout/logout.page';
import {LoggedInGuard} from '../logged-in.guard';
import {ProfilePasswordPage} from './profile-password/profile-password.page';
import {ProfileBasicPage} from './profile-basic/profile-basic.page';
import {CvPage} from './cv/cv.page';
import {StudiesPage} from './studies/studies.page';

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
  },
  {
    path: 'logout',
    component: LogoutPage
  },
  {
    path: 'cv',
    component: CvPage
  },
  {
    path: 'studies',
    component: StudiesPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePageRoutingModule {
}

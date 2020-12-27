import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfilePage} from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
  },
  {
    path: 'basic',
    loadChildren: () => import('./profile-basic/profile-basic.module').then(m => m.ProfileBasicPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./profile-password/profile-password.module').then(m => m.ProfilePasswordPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePageRoutingModule {
}

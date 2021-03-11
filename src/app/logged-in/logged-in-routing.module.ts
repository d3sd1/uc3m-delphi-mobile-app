import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from './logged-in.guard';
import {LogoutPage} from './profile/logout/logout.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'menu'
  },
  {
    path: 'menu',
    loadChildren: () => import('./home.module').then(m => m.TabsPageModule),
    canActivateChild: [LoggedInGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoggedInRoutingModule {
}

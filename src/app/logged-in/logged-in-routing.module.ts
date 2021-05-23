import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from './logged-in.guard';
import {LogoutPage} from './profile/logout/logout.page';
import {HomePage} from './home.page';
import {OnboardingPage} from './onboarding/onboarding.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'logout',
    component: LogoutPage,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'menu',
    component: HomePage,
    canActivate: [LoggedInGuard],
    canActivateChild: [LoggedInGuard],
    children: [
      {
        path: '',
        redirectTo: 'processes',
        pathMatch: 'full'
      },
      {
        path: 'processes',
        loadChildren: () => import('./processes/processes.module').then(m => m.ProcessesPageModule)
      },
      {
        path: 'chat',
        loadChildren: () => import('./chat/chat.module').then(m => m.ChatPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/menu/processes',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'onboarding',
    component: OnboardingPage,
    canActivate: [LoggedInGuard]
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

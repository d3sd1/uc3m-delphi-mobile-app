import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPage} from './login/login.page';
import {RegisterPage} from './register/register.page';
import {InvitationPage} from './invitation/invitation.page';
import {LoggedOutGuard} from './logged-out.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginPage,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'register',
    component: RegisterPage,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'invitation',
    component: InvitationPage,
    canActivate: [LoggedOutGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LoggedOutRoutingModule {
}

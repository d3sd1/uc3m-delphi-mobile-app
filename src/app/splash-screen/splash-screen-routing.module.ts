import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SplashScreenComponent} from './splash-screen.component';
import {ApiLoaderPage} from './api-loader/api-loader.page';
import {PermissionsLoaderPage} from './permissions-loader/permissions-loader.page';
import {InitLoaderPage} from './init-loader/init-loader.page';
import {WsLoaderPage} from './ws-loader/ws-loader.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'loader'
  },
  {
    path: 'loader',
    component: SplashScreenComponent,
    children: [
      {
        path: 'init',
        component: InitLoaderPage
      },
      {
        path: 'api',
        component: ApiLoaderPage
      },
      {
        path: 'ws',
        component: WsLoaderPage
      },
      {
        path: 'permissions',
        component: PermissionsLoaderPage
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SplashScreenRoutingModule {
}

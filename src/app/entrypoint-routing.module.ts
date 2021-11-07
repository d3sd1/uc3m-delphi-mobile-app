import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoggedInGuard} from './core/router/guard/logged-in.guard';
import {LoggedOutGuard} from './core/router/guard/logged-out.guard';
import {SplashScreenPage} from './splash-screen/splash-screen.page';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'splash-screen'
  },
  {
    path: 'splash-screen',
    component: SplashScreenPage
  },
  {
    path: 'logged-in',
    /*canActivateChild: [
      LoggedInGuard,
    ],*/
    loadChildren: () => import('./logged-in/logged-in.module').then(m => m.LoggedInModule)
  },
  {
    path: 'logged-out',
    canActivateChild: [
      LoggedOutGuard,
    ],
    loadChildren: () => import('./logged-out/logged-out.module').then(m => m.LoggedOutModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules, enableTracing: false, relativeLinkResolution: 'legacy'})
  ],
  exports: [RouterModule]
})
export class EntrypointRoutingModule {
}

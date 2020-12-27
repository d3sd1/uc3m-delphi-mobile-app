import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'splash-screen'
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./splash-screen/splash-screen.module').then(m => m.SplashScreenModule)
  },
  {
    path: 'logged-in',
    loadChildren: () => import('./logged-in/logged-in.module').then(m => m.LoggedInModule)
  },
  {
    path: 'logged-out',
    loadChildren: () => import('./logged-out/logged-out.module').then(m => m.LoggedOutModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class EntrypointRoutingModule {
}

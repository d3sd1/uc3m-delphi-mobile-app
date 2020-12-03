import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuPage} from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    component: MenuPage,
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
    path: '',
    redirectTo: '/menu/processes',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {
}

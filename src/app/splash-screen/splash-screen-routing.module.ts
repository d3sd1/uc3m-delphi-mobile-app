import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SplashScreenComponent} from './splash-screen.component';
import {ApiLoaderComponent} from './api-loader/api-loader.component';
import {PermissionLoaderComponent} from './permission-loader/permission-loader.component';
import {KafkaLoaderComponent} from './kafka-loader/kafka-loader.component';

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
        path: 'permission',
        component: PermissionLoaderComponent
      },
      {
        path: 'api',
        component: ApiLoaderComponent
      },
      {
        path: 'kafka',
        component: KafkaLoaderComponent
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

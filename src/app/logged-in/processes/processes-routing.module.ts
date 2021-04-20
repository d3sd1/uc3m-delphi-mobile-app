import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcessesPage} from './processes.page';
import {SinglePage} from './single/single.page';
import {ModifyPage} from './modify/modify.page';
import {UserPickerPage} from './user-picker/user-picker.page';
import {Process} from './process';
import {ModifyRoundsPage} from './modify/rounds/modify-rounds.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessesPage,
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then(m => m.LoadingPageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'single',
    component: SinglePage
  },
  {
    path: 'modify',
    component: ModifyPage
  },
  {
    path: 'modify_rounds',
    component: ModifyRoundsPage
  },
  {
    path: 'user-picker',
    component: UserPickerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesPageRoutingModule {
}

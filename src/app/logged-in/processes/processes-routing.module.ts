import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcessesPage} from './list/processes.page';
import {ModifyPage} from './single/modify.page';
import {UserPickerPage} from './single/user-picker/user-picker.page';
import {ModifyQuestionsPage} from './single/questions/list/modify-questions.page';
import {ModifyQuestionsContentPage} from './single/questions/content/modify-questions-content.page';
import {ProcessesResolver} from '../../core/router/resolver/processes.resolver';
import {UserResolver} from '../../core/router/resolver/user.resolver';
import {EditingProcessResolver} from '../../core/router/resolver/editing-process.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ProcessesPage,
    resolve: {
      processes: ProcessesResolver
    }
  },
  {
    path: 'single',
    children: [
      {
        path: '',
        redirectTo: 'basic',
        pathMatch: 'full'
      },
      {
        path: 'basic',
        component: ModifyPage,
        resolve: {
          user: UserResolver,
          process: EditingProcessResolver,
        },
      },
      {
        path: 'user-picker',
        component: UserPickerPage,
        resolve: {
          process: EditingProcessResolver
        }
      },
      {
        path: 'questions',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: ModifyQuestionsPage,
            resolve: {
              user: UserResolver,
              process: EditingProcessResolver
            },
          },
          {
            path: 'single',
            component: ModifyQuestionsContentPage
          },
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesPageRoutingModule {
}

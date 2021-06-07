import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcessesPage} from './list/processes.page';
import {SingleProcessPage} from './single/single-process.page';
import {UserPickerPage} from './single/user-picker/user-picker.page';
import {QuestionListPage} from './single/questions/list/question-list.page';
import {ModifyQuestionsContentPage} from './single/questions/single/modify-questions-content.page';
import {ProcessesResolver} from '../../core/router/resolver/processes.resolver';
import {UserResolver} from '../../core/router/resolver/user.resolver';
import {CurrentProcessResolver} from '../../core/router/resolver/current-process.resolver';
import {ClosePage} from './single/close/close.page';
import {ViewRoundsPage} from './single/rounds/view-rounds.page';
import {ViewSingleOldRoundPage} from './single/rounds/single-round/view-single-old-round.page';
import {ParticipatePage} from './single/participate/participate.page';

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
      user: UserResolver,
      processes: ProcessesResolver
    }
  },
  {
    path: 'single-round/:id',
    children: [
      {
        path: '',
        redirectTo: 'basic',
        pathMatch: 'full'
      },
      {
        path: 'basic',
        component: SingleProcessPage,
        resolve: {
          user: UserResolver,
          process: CurrentProcessResolver,
        },
      },
      {
        path: 'close',
        component: ClosePage,
        resolve: {
          user: UserResolver,
          process: CurrentProcessResolver,
        },
      },
      {
        path: 'participate',
        component: ParticipatePage,
        resolve: {
          user: UserResolver,
          process: CurrentProcessResolver,
        },
      },
      {
        path: 'rounds',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: ViewRoundsPage,
            resolve: {
              user: UserResolver,
              process: CurrentProcessResolver
            },
          },
          {
            path: 'single-round/:roundid',
            children: [
              {
                path: '',
                redirectTo: 'view',
                pathMatch: 'full'
              },
              {
                path: 'view',
                component: ViewSingleOldRoundPage,
                resolve: {
                  user: UserResolver,
                  process: CurrentProcessResolver
                },
              },
            ]
          },
        ]
      },
      {
        path: 'user-picker/:type',
        component: UserPickerPage,
        resolve: {
          user: UserResolver,
          process: CurrentProcessResolver
        }
      },
      {
        path: 'question',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: QuestionListPage,
            resolve: {
              user: UserResolver,
              process: CurrentProcessResolver
            },
          },
          {
            path: 'single-round/:questionid',
            component: ModifyQuestionsContentPage,
            resolve: {
              user: UserResolver,
              process: CurrentProcessResolver
            }
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

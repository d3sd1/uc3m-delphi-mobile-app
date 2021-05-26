import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcessesPage} from './list/processes.page';
import {SinglePage} from './single/single.page';
import {ModifyPage} from './modify/modify.page';
import {UserPickerPage} from './modify/user-picker/user-picker.page';
import {ModifyRoundsPage} from './modify/rounds/modify-rounds.page';
import {ModifyQuestionsPage} from './modify/rounds/questions/modify-questions.page';
import {ModifyQuestionsContentPage} from './modify/rounds/questions/content/modify-questions-content.page';
import {ViewRoundsPage} from './single/rounds/view-rounds.page';
import {ViewQuestionsPage} from './single/questions/view-questions.page';
import {ViewSingleQuestionPage} from './single/single-question/view-single-question.page';
import {ParticipatePage} from './single/participate/participate.page';
import {ClosePage} from './modify/close/close.page';
import {LoadingPage} from './list/loading/loading.page';
import {ProcessesResolver} from '../../core/router/resolver/processes.resolver';
import {UserResolver} from '../../core/router/resolver/user.resolver';
import {WsResolver} from '../../core/router/resolver/ws.resolver';

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
    path: 'modify',
    component: ModifyPage,
    children: [
      {
        path: 'rounds',
        component: ModifyRoundsPage,
        children: [
          {
            path: 'questions',
            component: ModifyQuestionsPage,
            children: [
              {
                path: 'content',
                component: ModifyQuestionsContentPage
              },
            ]
          },
          {
            path: 'user-picker',
            component: UserPickerPage
          },
        ]
      },
    ]
  },
  {
    path: 'view',
    component: SinglePage,
    children: [
      {
        path: 'participate',
        component: ParticipatePage
      },
      {
        path: 'rounds',
        component: ViewRoundsPage,
        children: [
          {
            path: 'questions',
            component: ViewQuestionsPage,
            children: [
              {
                path: 'single',
                component: ViewSingleQuestionPage
              },
            ]
          },

        ]
      },
      {
        path: 'close',
        component: ClosePage
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesPageRoutingModule {
}

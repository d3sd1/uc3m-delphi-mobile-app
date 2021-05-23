import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcessesPage} from './processes.page';
import {SinglePage} from './single/single.page';
import {ModifyPage} from './modify/modify.page';
import {UserPickerPage} from './user-picker/user-picker.page';
import {ModifyRoundsPage} from './modify/rounds/modify-rounds.page';
import {ModifyQuestionsPage} from './modify/questions/modify-questions.page';
import {ModifyQuestionsContentPage} from './modify/content/modify-questions-content.page';
import {ViewRoundsPage} from './single/rounds/view-rounds.page';
import {ViewQuestionsPage} from './single/questions/view-questions.page';
import {ViewSingleQuestionPage} from './single/single-question/view-single-question.page';
import {ParticipatePage} from './participate/participate.page';
import {ClosePage} from './modify/close/close.page';
import {LoadingPage} from './loading/loading.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessesPage,
  },
  {
    path: 'loading',
    component: LoadingPage
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
    path: 'modify_questions',
    component: ModifyQuestionsPage
  },
  {
    path: 'modify_question_content',
    component: ModifyQuestionsContentPage
  },
  {
    path: 'user-picker',
    component: UserPickerPage
  },
  {
    path: 'view_rounds',
    component: ViewRoundsPage
  },
  {
    path: 'view_questions',
    component: ViewQuestionsPage
  },
  {
    path: 'view_single_question',
    component: ViewSingleQuestionPage
  },
  {
    path: 'participate',
    component: ParticipatePage
  },
  {
    path: 'close',
    component: ClosePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesPageRoutingModule {
}

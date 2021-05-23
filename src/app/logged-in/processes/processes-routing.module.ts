import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcessesPage} from './list/processes.page';
import {SinglePage} from './view/single.page';
import {ModifyPage} from './modify/modify.page';
import {UserPickerPage} from './modify/user-picker/user-picker.page';
import {ModifyRoundsPage} from './modify/rounds/modify-rounds.page';
import {ModifyQuestionsPage} from './modify/questions/modify-questions.page';
import {ModifyQuestionsContentPage} from './modify/content/modify-questions-content.page';
import {ViewRoundsPage} from './view/rounds/view-rounds.page';
import {ViewQuestionsPage} from './view/questions/view-questions.page';
import {ViewSingleQuestionPage} from './view/single-question/view-single-question.page';
import {ParticipatePage} from './view/participate/participate.page';
import {ClosePage} from './modify/close/close.page';
import {LoadingPage} from './list/loading/loading.page';
import {ListPage} from './list/all/list.page';

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
    component: ListPage
  },
  {
    path: 'view',
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

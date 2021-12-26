import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProcessesPage} from './list/processes.page';
import {SingleProcessPage} from './single/single-process.page';
import {UserPickerPage} from './single/user-picker/user-picker.page';
import {CurrentRoundPage} from './single/rounds/current-round/current-round.page';
import {ModifyQuestionsContentPage} from './single/rounds/current-round/single-question/modify-questions-content.page';
import {ClosePage} from './single/close/close.page';
import {ViewRoundsPage} from './single/rounds/view-rounds.page';
import {ViewFinishedRoundPage} from './single/rounds/finished/view-finished-round.component';
import {ParticipatePage} from './single/participate/participate.page';
import {RemainingExpertsPage} from './single/rounds/current-round/poll-status/remaining-experts.page';
import {ViewStatisticsPage} from './single/rounds/finished/statistics/view-statistics-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ProcessesPage
  },
  {
    path: 'finished/:id',
    children: [
      {
        path: '',
        redirectTo: 'basic',
        pathMatch: 'full'
      },
      {
        path: 'basic',
        component: SingleProcessPage,
      },
      {
        path: 'close',
        component: ClosePage,
      },
      {
        path: 'participate',
        component: ParticipatePage,
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
          },
          {
            path: 'finished/:roundid',
            children: [
              {
                path: '',
                redirectTo: 'view',
                pathMatch: 'full'
              },
              {
                path: 'view',
                component: ViewFinishedRoundPage,
              },
            ]
          },
          {
            path: 'statistics/:roundid',
            children: [
              {
                path: '',
                redirectTo: 'view',
                pathMatch: 'full'
              },
              {
                path: 'view',
                component: ViewStatisticsPage,
              },
            ]
          },
        ]
      },
      {
        path: 'user-picker/:type',
        component: UserPickerPage
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
            component: CurrentRoundPage
          },
          {
            path: 'poll-status',
            component: RemainingExpertsPage
          },
          {
            path: 'finished/:questionid',
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

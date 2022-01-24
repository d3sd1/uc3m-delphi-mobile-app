import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProcessesPage} from './list/processes.page';

import {ProcessesPageRoutingModule} from './processes-routing.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {IonicRatingModule} from 'ionic4-rating';
import {CountdownModule} from 'ngx-countdown';
import {TranslateModule} from '@ngx-translate/core';
import {SingleProcessPage} from './single/single-process.page';
import {UserPickerPage} from './single/user-picker/user-picker.page';
import {CurrentRoundPage} from './single/rounds/current-round/current-round.page';
import {ModifyQuestionsContentPage} from './single/rounds/current-round/single-question/modify-questions-content.page';
import {ViewRoundsPage} from './single/rounds/view-rounds.page';
import {ParticipatePage} from './single/participate/participate.page';
import {ClosePage} from './single/close/close.page';
import {LoadingPage} from './list/loading/loading.page';
import {EmptyProcessesPage} from './list/empty/empty-processes.page';
import {ViewFinishedRoundPage} from './single/rounds/finished/view-finished-round.component';
import {RemainingExpertsPage} from './single/rounds/current-round/poll-status/remaining-experts.page';
import {ViewStatisticsPage} from './single/rounds/finished/statistics/view-statistics-page.component';
import {NgChartsModule} from 'ng2-charts';
import {RadioCheckerPage} from '../../core/components/radio-checker/radio-checker.page';
import {QuestionKindService} from '../../core/question-kind-service';
import {QualitativePage} from '../../core/components/qualitative/qualitative.page';
import {QuantitativePage} from '../../core/components/quantitative/quantitative.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProcessesPageRoutingModule,
    IonicRatingModule,
    CountdownModule,
    TranslateModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  declarations: [
    ProcessesPage,
    SingleProcessPage,
    UserPickerPage,
    CurrentRoundPage,
    ModifyQuestionsContentPage,
    ViewRoundsPage,
    ParticipatePage,
    ClosePage,
    LoadingPage,
    EmptyProcessesPage,
    ViewFinishedRoundPage,
    RemainingExpertsPage,
    ViewStatisticsPage,
    RadioCheckerPage,
    QualitativePage,
    QuantitativePage
  ],
  providers: [
    Geolocation,
    QuestionKindService
  ],

})
export class ProcessesPageModule {
}

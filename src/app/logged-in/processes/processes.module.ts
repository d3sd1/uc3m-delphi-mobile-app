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
import {QuestionBooltypePage} from './single/rounds/current-round/single-question/types/booltype/question-booltype.page';
import {QuestionQuantitativePage} from './single/rounds/current-round/single-question/types/quantitative/question-quantitative.page';
import {QuestionCatlikertPage} from './single/rounds/current-round/single-question/types/catlikert/question-catlikert.page';
import {QuestionCatcustomPage} from './single/rounds/current-round/single-question/types/catcustom/question-catcustom.page';
import {QuestionCatmultiPage} from './single/rounds/current-round/single-question/types/catmulti/question-catmulti.page';
import {QuestionCatpondPage} from './single/rounds/current-round/single-question/types/catpond/question-catpond.page';
import {ViewFinishedRoundPage} from './single/rounds/finished/view-finished-round.component';
import {RemainingExpertsPage} from './single/rounds/current-round/poll-status/remaining-experts.page';
import {ViewStatisticsPage} from './single/rounds/finished/statistics/view-statistics-page.component';
import {NgChartsModule} from 'ng2-charts';

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
    QuestionBooltypePage,
    QuestionQuantitativePage,
    QuestionCatlikertPage,
    QuestionCatcustomPage,
    QuestionCatmultiPage,
    QuestionCatpondPage,
    ViewFinishedRoundPage,
    RemainingExpertsPage,
    ViewStatisticsPage
  ],
  providers: [
    Geolocation
  ],

})
export class ProcessesPageModule {
}

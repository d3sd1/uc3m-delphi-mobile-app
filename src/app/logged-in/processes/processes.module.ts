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
import {QuestionListPage} from './single/questions/list/question-list.page';
import {ModifyQuestionsContentPage} from './single/questions/single/modify-questions-content.page';
import {ViewRoundsPage} from './single/rounds/view-rounds.page';
import {ParticipatePage} from './single/participate/participate.page';
import {ClosePage} from './single/close/close.page';
import {LoadingPage} from './list/loading/loading.page';
import {EmptyProcessesPage} from './list/empty/empty-processes.page';
import {QuestionBooltypePage} from './single/questions/types/booltype/question-booltype.page';
import {QuestionQuantitativePage} from './single/questions/types/quantitative/question-quantitative.page';
import {QuestionCatlikertPage} from './single/questions/types/catlikert/question-catlikert.page';
import {QuestionCatcustomPage} from './single/questions/types/catcustom/question-catcustom.page';
import {QuestionCatmultiPage} from './single/questions/types/catmulti/question-catmulti.page';
import {QuestionCatpondPage} from './single/questions/types/catpond/question-catpond.page';
import {ViewSingleOldRoundPage} from './single/rounds/single-round/view-single-old-round.page';
import {RemainingExpertsPage} from './single/questions/remaining_experts/remaining-experts.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProcessesPageRoutingModule,
    IonicRatingModule,
    CountdownModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProcessesPage,
    SingleProcessPage,
    UserPickerPage,
    QuestionListPage,
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
    ViewSingleOldRoundPage,
    RemainingExpertsPage
  ],
  providers: [
    Geolocation
  ],

})
export class ProcessesPageModule {
}

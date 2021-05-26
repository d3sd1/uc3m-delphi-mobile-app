import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProcessesPage} from './list/processes.page';

import {ProcessesPageRoutingModule} from './processes-routing.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {SinglePage} from './single/single.page';
import {IonicRatingModule} from 'ionic4-rating';
import {CountdownModule} from 'ngx-countdown';
import {TranslateModule} from '@ngx-translate/core';
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
import {EmptyProcessesPage} from './list/empty/empty-processes.page';
import {ProcessesResolver} from '../../core/router/resolver/processes.resolver';

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
  declarations: [ProcessesPage, SinglePage, ModifyPage, UserPickerPage, ModifyRoundsPage, ModifyQuestionsPage,
    ModifyQuestionsContentPage,
    ViewRoundsPage,
    ViewQuestionsPage,
    ViewSingleQuestionPage,
    ParticipatePage,
    ClosePage,
    LoadingPage,
    EmptyProcessesPage,
  ],
  providers: [
    Geolocation,
    ProcessesResolver
  ],

})
export class ProcessesPageModule {
}

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
import {ModifyPage} from './single/modify.page';
import {UserPickerPage} from './single/user-picker/user-picker.page';
import {ModifyQuestionsPage} from './single/questions/list/modify-questions.page';
import {ModifyQuestionsContentPage} from './single/questions/content/modify-questions-content.page';
import {ViewRoundsPage} from './single/rounds/view-rounds.page';
import {ViewSingleQuestionPage} from './single/questions/single-question/view-single-question.page';
import {ParticipatePage} from './single/participate/participate.page';
import {ClosePage} from './single/close/close.page';
import {LoadingPage} from './list/loading/loading.page';
import {EmptyProcessesPage} from './list/empty/empty-processes.page';
import {ProcessesResolver} from '../../core/router/resolver/processes.resolver';
import {EditingProcessResolver} from '../../core/router/resolver/editing-process.resolver';

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
    ModifyPage,
    UserPickerPage,
    ModifyQuestionsPage,
    ModifyQuestionsContentPage,
    ViewRoundsPage,
    ViewSingleQuestionPage,
    ParticipatePage,
    ClosePage,
    LoadingPage,
    EmptyProcessesPage,
  ],
  providers: [
    Geolocation,
    ProcessesResolver,
    EditingProcessResolver
  ],

})
export class ProcessesPageModule {
}

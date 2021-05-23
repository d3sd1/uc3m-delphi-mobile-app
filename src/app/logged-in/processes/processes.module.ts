import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProcessesPage} from './processes.page';

import {ProcessesPageRoutingModule} from './processes-routing.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {SinglePage} from './single/single.page';
import {IonicRatingModule} from 'ionic4-rating';
import {CountdownModule} from 'ngx-countdown';
import {TranslateModule} from '@ngx-translate/core';
import {ModifyPage} from './modify/modify.page';
import {UserPickerPage} from './user-picker/user-picker.page';
import {RoleService} from './role.service';
import {ModifyRoundsPage} from './modify/rounds/modify-rounds.page';
import {ModifyQuestionsPage} from './modify/questions/modify-questions.page';
import {ModifyQuestionsContentPage} from './modify/content/modify-questions-content.page';
import {ViewRoundsPage} from './single/rounds/view-rounds.page';
import {ViewQuestionsPage} from './single/questions/view-questions.page';
import {ViewSingleQuestionPage} from './single/single-question/view-single-question.page';
import {ParticipatePage} from './participate/participate.page';
import {ClosePage} from './modify/close/close.page';
import {LoadingPage} from './loading/loading.page';
import {ListPage} from './list/list.page';
import {EmptyProcessesPage} from './list/empty/empty-processes.page';
import {ProcessConsumer} from '../../core/consumer/process/process.consumer';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProcessesPageRoutingModule,
    IonicRatingModule,
    CountdownModule,
    TranslateModule
  ],
  declarations: [ProcessesPage, SinglePage, ModifyPage, UserPickerPage, ModifyRoundsPage, ModifyQuestionsPage,
    ModifyQuestionsContentPage,
    ViewRoundsPage,
    ViewQuestionsPage,
    ViewSingleQuestionPage,
    ParticipatePage,
    ClosePage,
    LoadingPage,
    ListPage,
    EmptyProcessesPage
  ],
  providers: [
    Geolocation,
    RoleService,
    ProcessConsumer
  ],

})
export class ProcessesPageModule {
}

import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProcessesPage} from './processes.page';

import {ProcessesPageRoutingModule} from './processes-routing.module';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {LoadingPageModule} from './loading/loading.module';
import {ListPageModule} from './list/list.module';
import {SinglePage} from './single/single.page';
import {ProcessService} from './process.service';
import {IonicRatingModule} from 'ionic4-rating';
import {CountdownModule} from 'ngx-countdown';
import {TranslateModule} from '@ngx-translate/core';
import {ModifyPage} from './modify/modify.page';
import {EmptyPage} from './list/empty/empty.page';
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

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProcessesPageRoutingModule,
    LoadingPageModule,
    ListPageModule,
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
    ClosePage
  ],
  providers: [
    Geolocation,
    ProcessService,
    RoleService
  ],

})
export class ProcessesPageModule {
}

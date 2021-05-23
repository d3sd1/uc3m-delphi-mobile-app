import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProfilePage} from './profile.page';

import {ProfilePageRoutingModule} from './profile-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProfileBasicPage} from './profile-basic/profile-basic.page';
import {UserConsumer} from '../../core/consumer/user/user.consumer';
import {ProcessConsumer} from '../../core/consumer/process/process.consumer';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{path: '', component: ProfilePage}]),
    ProfilePageRoutingModule,
    TranslateModule
  ],
  declarations: [
    ProfilePage,
    ProfileBasicPage
  ],
  providers: [

  ],
  exports: [
    TranslateModule
  ]
})
export class ProfilePageModule {
}

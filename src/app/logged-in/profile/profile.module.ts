import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProfilePage} from './profile.page';

import {ProfilePageRoutingModule} from './profile-routing.module';
import {LangService} from './lang.service';
import {TranslateModule} from '@ngx-translate/core';

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
    ProfilePage
  ],
  providers: [
    LangService
  ],
  exports: [
    TranslateModule
  ]
})
export class ProfilePageModule {
}

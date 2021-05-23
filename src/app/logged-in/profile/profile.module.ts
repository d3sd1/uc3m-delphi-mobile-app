import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProfilePage} from './profile.page';

import {ProfilePageRoutingModule} from './profile-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {ProfilePasswordPage} from './profile-password/profile-password.page';
import {LogoutPage} from './logout/logout.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProfilePageRoutingModule,
    TranslateModule
  ],
  declarations: [
    ProfilePage,
    ProfilePasswordPage,
    LogoutPage
  ],
})
export class ProfilePageModule {
}

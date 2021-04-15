import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ProfileBasicPageRoutingModule} from './profile-basic-routing.module';

import {ProfileBasicPage} from './profile-basic.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileBasicPageRoutingModule,
    TranslateModule
  ],
  declarations: [ProfileBasicPage],
  exports: [
    TranslateModule
  ]
})
export class ProfileBasicPageModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CvPageRoutingModule } from './cv-routing.module';

import { CvPage } from './cv.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CvPageRoutingModule,
    TranslateModule
  ],
  declarations: [CvPage]
})
export class CvPageModule {}

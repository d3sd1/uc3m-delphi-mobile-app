import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudiesPageRoutingModule } from './studies-routing.module';

import { StudiesPage } from './studies.page';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudiesPageRoutingModule,
    TranslateModule
  ],
  declarations: [StudiesPage]
})
export class StudiesPageModule {}

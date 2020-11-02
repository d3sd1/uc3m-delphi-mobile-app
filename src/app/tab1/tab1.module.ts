import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import {ProccessesComponent} from './proccesses/proccesses.component';
import {FingerprintAIO} from '@ionic-native/fingerprint-aio';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule
  ],
    declarations: [Tab1Page, ProccessesComponent],

  providers: [

    FingerprintAIO,
  ]
})
export class Tab1PageModule {}

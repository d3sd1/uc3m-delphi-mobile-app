import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {ExploreContainerComponentModule} from '../../explore-container/explore-container.module';

import {Tab1PageRoutingModule} from './tab1-routing.module';
import {ProccessesComponent} from './proccesses/proccesses.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';

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
    Geolocation
  ]

})
export class Tab1PageModule {
}

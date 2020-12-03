import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProcessesPage} from './processes.page';
import {ExploreContainerComponentModule} from '../../../explore-container/explore-container.module';

import {ProcessesPageRoutingModule} from './processes-routing.module';
import {ProcessesComponent} from './processes/processes.component';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ProcessesPageRoutingModule
  ],
  declarations: [ProcessesPage, ProcessesComponent],
  providers: [
    Geolocation
  ]

})
export class ProcessesPageModule {
}

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import {ChatComponent} from './chat/chat.component';
import {NbCardModule, NbSpinnerModule} from '@nebular/theme';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    NbCardModule,
    NbSpinnerModule
  ],
    declarations: [Tab2Page, ChatComponent]
})
export class Tab2PageModule {}

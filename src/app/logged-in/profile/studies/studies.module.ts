import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StudiesPageRoutingModule } from './studies-routing.module';

import { StudiesPage } from './studies.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudiesPageRoutingModule
  ],
  declarations: [StudiesPage]
})
export class StudiesPageModule {}

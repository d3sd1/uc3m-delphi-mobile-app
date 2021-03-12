import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggedOutRoutingModule} from './logged-out-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {UserStorage} from '../core/storage/user.storage';
import {FormsModule} from '@angular/forms';
import {LoginPage} from './login/login.page';
import {IonicModule} from '@ionic/angular';
import {InvitationPage} from './invitation/invitation.page';
import {LoginConsumer} from '../core/consumer/login/login.consumer';


@NgModule({
  declarations: [
    LoginPage,
    InvitationPage
  ],
  imports: [
    CommonModule,
    LoggedOutRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule
  ],
  providers: [
    UserStorage,
    LoginConsumer
  ],
})
export class LoggedOutModule {
}

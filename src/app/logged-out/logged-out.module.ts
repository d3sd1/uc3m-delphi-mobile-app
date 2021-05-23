import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggedOutRoutingModule} from './logged-out-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {UserStorage} from '../core/storage/user.storage';
import {FormsModule} from '@angular/forms';
import {LoginPage} from './login/login.page';
import {IonicModule} from '@ionic/angular';
import {UserConsumer} from '../core/consumer/user/user.consumer';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [
    LoginPage
  ],
  imports: [
    CommonModule,
    LoggedOutRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    TranslateModule
  ],
  providers: [
    UserStorage,
    UserConsumer
  ],
})
export class LoggedOutModule {
}

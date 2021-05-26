import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggedOutRoutingModule} from './logged-out-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {LoginPage} from './login/login.page';
import {IonicModule} from '@ionic/angular';
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
  providers: []
})
export class LoggedOutModule {
}

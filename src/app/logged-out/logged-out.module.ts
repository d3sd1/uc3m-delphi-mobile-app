import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggedOutRoutingModule} from './logged-out-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginPage} from './login/login.page';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';
import {ForgotPasswordPage} from './forgot-password/forgot-password.page';
import {RegisterPage} from './register/register.page';


@NgModule({
  declarations: [
    LoginPage,
    ForgotPasswordPage,
    RegisterPage
  ],
  imports: [
    CommonModule,
    LoggedOutRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class LoggedOutModule {
}

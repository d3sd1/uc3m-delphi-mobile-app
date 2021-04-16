import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggedInRoutingModule} from './logged-in-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoggedInInterceptor} from './logged-in.interceptor';
import {TranslateModule} from '@ngx-translate/core';
import {ProfilePasswordPage} from './profile/profile-password/profile-password.page';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    ProfilePasswordPage
  ],
  imports: [
    CommonModule,
    LoggedInRoutingModule,
    HttpClientModule,
    TranslateModule,
    IonicModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggedInInterceptor,
      multi: true
    }
  ],
  exports: [
    TranslateModule
  ]
})
export class LoggedInModule {
}

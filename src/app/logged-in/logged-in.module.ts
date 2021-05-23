import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggedInRoutingModule} from './logged-in-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoggedInInterceptor} from './logged-in.interceptor';
import {TranslateModule} from '@ngx-translate/core';
import {ProfilePasswordPage} from './profile/profile-password/profile-password.page';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {ProcessConsumer} from '../core/consumer/process/process.consumer';
import {UserConsumer} from '../core/consumer/user/user.consumer';
import {DelphiCoreModule} from '../core/delphi-core.module';
import {ChatPageModule} from './chat/chat.module';
import {OnboardingPage} from './onboarding/onboarding.page';
import {ProcessesPageModule} from './processes/processes.module';
import {ProfilePageModule} from './profile/profile.module';


@NgModule({
  declarations: [
    OnboardingPage
  ],
  imports: [
    CommonModule,
    LoggedInRoutingModule,
    TranslateModule,
    IonicModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggedInInterceptor,
      multi: true
    },
  ],
  exports: [
    TranslateModule
  ]
})
export class LoggedInModule {
}

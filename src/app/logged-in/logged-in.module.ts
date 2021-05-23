import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggedInRoutingModule} from './logged-in-routing.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoggedInInterceptor} from './logged-in.interceptor';
import {TranslateModule} from '@ngx-translate/core';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {OnboardingPage} from './onboarding/onboarding.page';
import {ProfilePageModule} from './profile/profile.module';
import {ProcessesPageModule} from './processes/processes.module';
import {ChatPageModule} from './chat/chat.module';
import {HomePage} from './home.page';
import {LoggedInGuard} from './logged-in.guard';


@NgModule({
  declarations: [
    OnboardingPage,
    HomePage,
  ],
  imports: [
    CommonModule,
    LoggedInRoutingModule,
    IonicModule,
    FormsModule,
    ProfilePageModule,
    ProcessesPageModule,
    ChatPageModule,
    TranslateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggedInInterceptor,
      multi: true
    },
    LoggedInGuard
  ]
})
export class LoggedInModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggedInRoutingModule} from './logged-in-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoggedInInterceptor} from './logged-in.interceptor';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggedInRoutingModule,
    HttpClientModule,
    TranslateModule
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

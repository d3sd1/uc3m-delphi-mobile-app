import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggedInRoutingModule} from './logged-in-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './auth.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggedInRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    HttpClientModule
  ]
})
export class LoggedInModule {
}

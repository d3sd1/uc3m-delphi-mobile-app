import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggedInRoutingModule} from './logged-in-routing.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggedInRoutingModule,
    HttpClientModule
  ],
  providers: [],
  exports: [
    HttpClientModule
  ]
})
export class LoggedInModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoggedOutRoutingModule} from './logged-out-routing.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoggedOutRoutingModule,
    HttpClientModule
  ],
  providers: [],
  exports: [
    HttpClientModule
  ]
})
export class LoggedOutModule {
}

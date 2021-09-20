import {ModuleWithProviders, NgModule} from '@angular/core';
import {LangService} from './lang/lang.service';
import {DatabaseService} from './consumer/database.service';
import {CompatibilityService} from './devices/compatibility.service';
import {UserConsumer} from './consumer/user/user.consumer';
import {ProcessConsumer} from './consumer/process/process.consumer';
import {ChatConsumer} from './consumer/chat/chat.consumer';


@NgModule({
  declarations: [],
  imports: [],
  providers: [
    DatabaseService,
    LangService,
    CompatibilityService,
  ],
})
export class DelphiCoreModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: DelphiCoreModule,
      providers: [
        UserConsumer,
        ProcessConsumer,
        ChatConsumer
      ]
    };
  }
}


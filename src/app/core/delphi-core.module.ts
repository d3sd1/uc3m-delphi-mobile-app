import {ModuleWithProviders, NgModule} from '@angular/core';
import {UserConsumer} from '../logged-in/user.consumer';
import {ProcessConsumer} from '../logged-in/processes/process.consumer';
import {ChatConsumer} from '../logged-in/chat/chat.consumer';


@NgModule({
  declarations: [],
  imports: [],
  providers: [],
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


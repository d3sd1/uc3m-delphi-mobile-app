import {ModuleWithProviders, NgModule} from '@angular/core';
import {LangService} from './lang/lang.service';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {DatabaseService} from './consumer/database.service';
import {CompatibilityService} from './devices/compatibility.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {UserConsumer} from './consumer/user/user.consumer';
import {ProcessConsumer} from './consumer/process/process.consumer';
import {ChatConsumer} from './consumer/chat/chat.consumer';


@NgModule({
  declarations: [],
  imports: [

  ],
  providers: [
    DatabaseService,
    LangService,
    SQLite,
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


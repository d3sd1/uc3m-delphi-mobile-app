import {NgModule} from '@angular/core';
import {LangService} from './lang/lang.service';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {DatabaseService} from './consumer/database.service';
import {CompatibilityService} from './devices/compatibility.service';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    DatabaseService,
    LangService,
    TranslateService,
    TranslateStore,
    SQLite,
    CompatibilityService
  ],
  exports: [
    TranslateModule
  ]
})
export class DelphiCoreModule {
}
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

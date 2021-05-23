import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LangService} from './lang/lang.service';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStore} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '../entrypoint.module';
import {SQLite} from '@ionic-native/sqlite/ngx';
import {DatabaseService} from './consumer/database.service';
import {CompatibilityService} from './devices/compatibility.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
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

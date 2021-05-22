import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LangService} from './lang/lang.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {HttpLoaderFactory} from '../entrypoint.module';


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
    LangService
  ],
  exports: [
    TranslateModule
  ]
})
export class DelphiCoreModule {
}

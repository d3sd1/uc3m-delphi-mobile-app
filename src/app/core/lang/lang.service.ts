import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {Language} from '../../logged-in/profile/language';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor(
    private translate: TranslateService,
    private httpClient: HttpClient) {
  }

  init() {
    this.getAvailableLangs().then((langs: Language[]) => {
      this.registerLanguages(langs);
      this.changeLanguage(langs[0]);
    }).catch(() => {

    });
  }

  registerLanguages(langs: Language[]) {
    const keyLangs = [];
    langs.forEach((lang: Language) => {
      keyLangs.push(lang.keyName.toLowerCase());
    });
    this.translate.addLangs(keyLangs);
  }

  changeLanguage(lang: Language) {
    this.translate.setDefaultLang(lang.keyName.toLowerCase());
    this.translate.use(lang.keyName.toLowerCase());
  }

  private getAvailableLangs(): Promise<Language[]> {
    return this.httpClient.get<Language[]>(environment.apiUrl + '/v1/delphi/langs').toPromise();
  }
}

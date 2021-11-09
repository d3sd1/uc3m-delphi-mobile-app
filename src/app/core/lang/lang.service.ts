import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {Language} from '../model/language';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  private langs: Language[];

  constructor(
    private translate: TranslateService,
    private httpClient: HttpClient) {
  }

  async init() {
    const langs = this.getAvailableLangs();
    this.registerLanguages(langs);
    this.changeLanguage(
      new Language(0, this.translate.getBrowserLang(), true)
    );
  }

  registerLanguages(langs: Language[]) {
    const keyLangs = [];
    langs?.forEach((lang: Language) => {
      keyLangs.push(lang?.name.toLowerCase());
    });
    this.translate.addLangs(keyLangs);
  }

  changeLanguage(lang: Language) {
    this.translate.setDefaultLang(lang?.name.toLowerCase());
    this.translate.use(lang?.name.toLowerCase());
  }

  getAvailableLangs(): Language[] {
    return [
      new Language(1, 'es', true),
    ];
  }
}

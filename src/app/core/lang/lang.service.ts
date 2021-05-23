import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {Language} from '../../logged-in/profile/language';
import {environment} from '../../../environments/environment';

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
    const langs = await this.getAvailableLangs();
    this.registerLanguages(langs);
    if(langs?.length > 0) {
      this.changeLanguage(langs[0]);
    }
  }

  registerLanguages(langs: Language[]) {
    const keyLangs = [];
    langs?.forEach((lang: Language) => {
      keyLangs.push(lang.keyName.toLowerCase());
    });
    this.translate.addLangs(keyLangs);
  }

  changeLanguage(lang: Language) {
    this.translate.setDefaultLang(lang.keyName.toLowerCase());
    this.translate.use(lang.keyName.toLowerCase());
  }

  async getAvailableLangs(): Promise<Language[]> {
    if(this.langs?.length === 0) {
      this.langs = await this.httpClient.get<Language[]>(environment.apiUrl + '/v1/delphi/langs').toPromise();
    }
    return this.langs;
  }
}

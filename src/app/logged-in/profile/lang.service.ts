import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Language} from './language';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor(private httpClient: HttpClient) {
  }

  getAvailableLangs(): Promise<Language[]> {
    return this.httpClient.get<Language[]>(environment.apiUrl + '/v1/delphi/langs').toPromise();
  }
}

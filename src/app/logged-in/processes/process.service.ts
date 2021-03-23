import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {UserStorage} from '../../core/storage/user.storage';
import {Process} from './process';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  constructor(private httpClient: HttpClient) {
  }

  list(): Promise<Process[]> {
    return this.httpClient.get<Process[]>(environment.apiUrl + '/v1/process/list')
      .toPromise();
  }
}

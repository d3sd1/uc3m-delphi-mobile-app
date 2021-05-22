import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Process} from './process';
import {WsService} from '../../core/ws/ws.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {
  constructor(private httpClient: HttpClient, private wsService: WsService) {
  }

  list(): Promise<Process[]> {
    return this.httpClient.get<Process[]>(environment.apiUrl + '/v1/process/list')
      .toPromise();
  }
}

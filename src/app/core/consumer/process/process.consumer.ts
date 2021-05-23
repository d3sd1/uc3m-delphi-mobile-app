import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WsService} from '../../ws/ws.service';
import {Process} from '../../../logged-in/processes/process';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessConsumer {

  private userProcesses: BehaviorSubject<Process[]> = null;

  constructor(private httpClient: HttpClient, private wsService: WsService) {
  }


  private listenUpdates() {
    this.wsService.subscribe('process/all', true, this.userProcesses);
  }
  //TODO: stop listening changes on destroy (logout)

  async all(): Promise<BehaviorSubject<Process[]>> {
    if(this.userProcesses === null) {

      this.userProcesses = new BehaviorSubject<Process[]>(
        (await this.httpClient.get<Process[]>(environment.apiUrl + '/v1/process/list').toPromise())
      );
     this.listenUpdates();
    }
    return this.userProcesses;
  }
}
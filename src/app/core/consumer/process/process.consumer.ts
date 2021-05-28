import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WsService} from '../../ws/ws.service';
import {Process} from '../../model/process';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessConsumer {

  private userProcesses: BehaviorSubject<Process[]> = new BehaviorSubject<Process[]>([]);
  private userProcessesCache: Process[] = null;

  constructor(private httpClient: HttpClient, private wsService: WsService) {
  }

  async all(): Promise<BehaviorSubject<Process[]>> {
    if (this.userProcessesCache === null) {
      this.userProcessesCache = (await this.httpClient.get<Process[]>(environment.apiUrl + '/v1/process/list').toPromise());
      this.userProcesses.next(this.userProcessesCache);
    }
    return this.userProcesses;
  }

  async createProcess(name: string, description: string) {
    const process = new Process();
    process.name = name;
    process.description = description;
    (await this.httpClient.put<Process>(environment.apiUrl + '/v1/process', process).toPromise());
  }

  private listenUpdates() {
    this.wsService.subscribe('process/all', true, this.userProcesses);
  }
}

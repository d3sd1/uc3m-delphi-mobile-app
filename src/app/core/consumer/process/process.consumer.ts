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
  private userSingleProcesses: BehaviorSubject<Process>[] = [];

  constructor(private httpClient: HttpClient, private wsService: WsService) {
  }

  async all(): Promise<BehaviorSubject<Process[]>> {
    if (this.userProcessesCache === null) {
      this.userProcessesCache = (await this.httpClient.get<Process[]>(environment.apiUrl + '/v1/process/list').toPromise());
      this.userProcesses.next(this.userProcessesCache);
      this.listenUpdates();
    }
    return this.userProcesses;
  }

  async getById(id: number): Promise<BehaviorSubject<Process>> {
    return new Promise(((resolve, reject) => {
      if (!(id in this.userSingleProcesses)) {
        reject("Id not found for id " + id);
      }
      resolve(this.userSingleProcesses[id]);
    }));
  }

  async createProcess(name: string, description: string) {
    const process = new Process();
    process.name = name;
    process.description = description;
    (await this.httpClient.put<Process>(environment.apiUrl + '/v1/process', process).toPromise());
  }

  private listenUpdates() {
    // Bubble all with websocket
    this.wsService.subscribe('process/list', true, this.userProcesses);

    // Bubble single from websocket updated data (single-channel-simplicity)
    this.userProcesses.subscribe((processes) => {
      processes.forEach((process) => {
        if (!(process.id in this.userSingleProcesses)) {
          this.userSingleProcesses[process.id] = new BehaviorSubject<Process>(process);
        } else {
          this.userSingleProcesses[process.id].next(process);
        }
      });
    });
  }
}

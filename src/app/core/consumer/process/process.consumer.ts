import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WsService} from '../../ws/ws.service';
import {Process} from '../../model/process';
import {environment} from '../../../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {Round} from '../../model/round';

@Injectable({
  providedIn: 'root'
})
export class ProcessConsumer {

  private userProcesses: BehaviorSubject<Process[]> = new BehaviorSubject<Process[]>([]);
  private userProcessesCache: Process[] = null;
  private userSingleProcesses: BehaviorSubject<Process>[] = [];

  constructor(private httpClient: HttpClient, private wsService: WsService) {
  }

  private async initializeLoaders() {
    if (this.userProcessesCache === null) {
      this.listenUpdates();
    }
  }


  async all(): Promise<BehaviorSubject<Process[]>> {
    await this.initializeLoaders();
    return this.userProcesses;
  }

  async getById(id: number): Promise<BehaviorSubject<Process>> {
    return new Promise((async (resolve, reject) => {
      await this.initializeLoaders();
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
   // (await this.httpClient.put<Process>(environment.apiUrl + '/v1/process', process).toPromise());
    await this.wsService.publish('process/list', process);
  }

  private listenUpdates() {
    // Bubble all with websocket
    this.wsService.subscribe('process/list', true, this.userProcesses);

    // Bubble single-round from websocket updated data (single-round-channel-simplicity)
    this.userProcesses.subscribe((processes) => {
      console.log('processes are:', processes);
      processes.forEach((process) => {

        if (process.currentRound === undefined || process.currentRound === null) {
          process.currentRound = new Round();
        }
        if (process.currentRound.questions === undefined || process.currentRound.questions === null) {
          process.currentRound.questions = [];
        }
        if (!(process.id in this.userSingleProcesses)) {
          this.userSingleProcesses[process.id] = new BehaviorSubject<Process>(process);
        } else {
          this.userSingleProcesses[process.id].next(process);
        }
      });
    });
  }
}

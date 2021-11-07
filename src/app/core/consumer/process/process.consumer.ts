import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WsService} from '../../service/ws.service';
import {Process} from '../../model/process';
import {BehaviorSubject} from 'rxjs';
import {Round} from '../../model/round';
import {WsMode} from '../../ws/ws-mode.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessConsumer {

  private userProcesses: BehaviorSubject<Process[]> = new BehaviorSubject<Process[]>([]);
  private userProcessesCache: Process[] = null;
  private userSingleProcesses: BehaviorSubject<Process>[] = [];

  constructor(private httpClient: HttpClient, private wsService: WsService) {
    this.listenUpdates();
  }


  async all(): Promise<BehaviorSubject<Process[]>> {
    return this.userProcesses;
  }

  async getById(id: number): Promise<BehaviorSubject<Process>> {
    return new Promise((async (resolve, reject) => {
      if (!(id in this.userSingleProcesses)) {
        reject("Id not found for id " + id);
      }
      resolve(this.userSingleProcesses[id]);
    }));
  }

  createProcess(name: string, description: string) {
    this.wsService.publish('process', {name, description}, WsMode.CREATE);
  }

  private listenUpdates() {
    this.wsService.subscribe('process', true, this.userProcesses);
  }
}

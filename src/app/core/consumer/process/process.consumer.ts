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

  constructor(private httpClient: HttpClient, private wsService: WsService) {
    this.listenUpdates();
  }


  getProcesses(): BehaviorSubject<Process[]> {
    return this.userProcesses;
  }

  createProcess(name: string, description: string) {
    this.wsService.publish('process', {name, description}, WsMode.CREATE);
  }

  updateProcessBasicData(processId: number, name: string, description: string, objectives: string) {
    this.wsService.publish('process', {processId, name, description, objectives}, WsMode.UPDATE);
  }

  private listenUpdates() {
    this.wsService.subscribe('process', true, this.userProcesses);
  }
}

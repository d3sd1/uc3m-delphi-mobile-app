import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WsService} from '../../service/ws.service';
import {Process} from '../../model/process';
import {BehaviorSubject, Observable} from 'rxjs';
import {WsMode} from '../../ws/ws-mode.model';

@Injectable({
  providedIn: 'root'
})
export class ProcessConsumer {

  private userProcessIds: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  private userProcessesIndividual: BehaviorSubject<Process>[] = [];
  private userProcesses: BehaviorSubject<Process[]> = new BehaviorSubject<Process[]>([]);

  constructor(private httpClient: HttpClient, private wsService: WsService) {
    this.listenProcessesUpdates();
  }

  getProcesses(): BehaviorSubject<Process[]> {
    return this.userProcesses;
  }

  getProcess(processId: number): BehaviorSubject<Process> {
    if (!(processId in this.userProcessesIndividual)) {
      this.subscribeIndividual(processId);
    }
    return this.userProcessesIndividual[processId];
  }

  createProcess(name: string, description: string) {
    this.wsService.publish('process', {name, description}, WsMode.CREATE);
  }

  private listenProcessesUpdates() {
    this.wsService.subscribe('process/all', true, this.userProcessIds);
    this.listenIndividualChannels();
  }

  private subscribeIndividual(processId: number) {
    this.userProcessesIndividual[processId] = new BehaviorSubject<Process>(null);
    this.wsService.subscribe(`process/single/${processId}`, true, this.userProcessesIndividual[processId]);
  }

  private listenIndividualChannels() {
    this.userProcessIds.subscribe((processIds) => {
      if (processIds === undefined) {
        return;
      }

      processIds.forEach((processId) => {
        if (Number.isInteger(processId)) {
          if (!(processId in this.userProcessesIndividual)) {
            this.subscribeIndividual(processId);
          }
          this.userProcessesIndividual[processId].subscribe((process) => {
            if (process === null) {
              return;
            }
            const idx = this.userProcesses.value.findIndex((p => p.id === process.id));
            let durArr = [...this.userProcesses.value];
            if (idx === -1) {
              durArr.push(process);
            } else {
              durArr[idx] = process;
            }
            durArr = durArr.filter((p) => p !== undefined && p !== null);
            if (durArr.length > 0) {
              this.userProcesses.next(durArr);
            }
          });
        }
      });
    });
  }

  updateProcessBasicData(processId: number, name: string, description: string, objectives: string) {
    this.wsService.publish(`process`, {processId, name, description, objectives}, WsMode.UPDATE);
  }
}

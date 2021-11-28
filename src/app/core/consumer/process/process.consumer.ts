import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WsService} from '../../service/ws.service';
import {Process} from '../../model/process';
import {BehaviorSubject} from 'rxjs';
import {WsMode} from '../../ws/ws-mode.model';
import {Answer} from '../../model/answer';

@Injectable({
  providedIn: 'root'
})
export class ProcessConsumer {

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
    this.wsService.subscribe('process/all', true, this.userProcesses);
    this.listenIndividualChannels();
  }

  private subscribeIndividual(processId: number) {
    this.userProcessesIndividual[processId] = new BehaviorSubject<Process>(null);
    this.wsService.subscribe(`process/single/${processId}`, true, this.userProcessesIndividual[processId]);
    return this.userProcessesIndividual[processId];
  }

  private listenIndividualChannels() {
    this.userProcesses.subscribe((defaultProcesses) => {
      if (defaultProcesses === undefined) {
        return;
      }

      defaultProcesses.forEach((defaultProcess) => {
        if (Number.isInteger(defaultProcess.id)) {
          if (!(defaultProcess.id in this.userProcessesIndividual)) {
            this.subscribeIndividual(defaultProcess.id);
          }
          this.userProcessesIndividual[defaultProcess.id].subscribe((process) => {
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
            if (durArr.length > 0 && (idx in this.userProcessesIndividual)) { // TODO <. aqui puede haber error
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

  updateRoundBasicData(processId: number, name: string, limitTime: Date) {
    this.wsService.publish(`process/rounds/current/basic`, {processId, name, limitTime}, WsMode.UPDATE);
  }

  saveParticipation(processId: number, answers: Answer[]) {
    this.wsService.publish(`process/rounds/current/participate`, {
        processId,
        answers: answers.map((answer) => {
          return {questionId: answer.question.id, response: answer.response};
        })
      },
      WsMode.UPDATE);
  }

  addQuestion(processId: number, name: string, selectedQuestionType: string) {
    this.wsService.publish(`process/rounds/current/question`, {processId, name, selectedQuestionType}, WsMode.CREATE);
  }

  startCurrentRound(processId: number) {
    this.wsService.publish(`process/rounds/current/start`, {processId}, WsMode.UPDATE);
  }

  endCurrentRound(processId: number) {
    this.wsService.publish(`process/rounds/current/end`, {processId}, WsMode.UPDATE);
  }

  closeProcess(processId: number) {
    this.wsService.publish(`process/finish`, {processId}, WsMode.UPDATE);
  }

  updateQuestion(processId: number, questionId: number, name: string, questionTypeId: number,
                 minVal: number, maxVal: number, maxSelectable: number, orderPosition: number) {
    // todo , q.categories
    this.wsService.publish(`process/rounds/current/question`, {
      processId,
      questionId,
      questionTypeId,
      name,
      minVal,
      maxVal,
      maxSelectable,
      orderPosition
    }, WsMode.UPDATE);
  }

  reorderQuestion(processId: number, fromId: number, fromPosition: number, toId: number, toPosition: number) {
    this.wsService.publish(`process/rounds/current/question/reorder`, {
      processId,
      fromId,
      fromPosition,
      toId,
      toPosition
    }, WsMode.UPDATE);
  }
}

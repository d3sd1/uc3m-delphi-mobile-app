import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WsService} from '../../core/service/ws/ws.service';
import {Process} from '../../core/model/process';
import {BehaviorSubject} from 'rxjs';
import {WsMode} from '../../core/service/ws/ws-mode.model';
import {Answer} from '../../core/model/answer';

@Injectable({
  providedIn: 'root'
})
export class ProcessConsumer {

  private userProcesses: BehaviorSubject<Process[]> = new BehaviorSubject<Process[]>([]);

  constructor(private httpClient: HttpClient, private wsService: WsService) {
    this.listenProcessesUpdates();
  }

  getProcesses(): BehaviorSubject<Process[]> {
    return this.userProcesses;
  }

  createProcess(name: string, description: string) {
    this.wsService.publish('process', {name, description}, WsMode.CREATE);
  }

  updateProcessBasicData(processId: number, name: string, description: string, objectives: string) {
    this.wsService.publish(`process`, {processId, name, description, objectives}, WsMode.UPDATE);
  }

  updateRoundBasicData(processId: number, name: string, limitTime: string) {
    this.wsService.publish(`process/rounds/current/basic`, {processId, name, limitTime}, WsMode.UPDATE);
  }

  saveParticipation(processId: number, answers: Answer[]) {
    this.wsService.publish(`process/rounds/current/participate`, {
        processId,
        answers: answers.map((answer) => {
          return {questionId: answer.question.id, content: answer.content};
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

  updateQuestion(processId: number, questionId: number, name: string, questionTypeName: string,
                 minVal: number, maxVal: number, maxSelectable: number, orderPosition: number) {
    // todo , q.categories
    this.wsService.publish(`process/rounds/current/question`, {
      processId,
      questionId,
      questionTypeName,
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

  private listenProcessesUpdates() {
    this.wsService.listen('process/all', true, this.userProcesses);
  }
}

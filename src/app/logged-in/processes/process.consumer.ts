import {Injectable} from '@angular/core';
import {WsService} from '../../core/service/ws/ws.service';
import {Process} from '../../core/model/process';
import {BehaviorSubject} from 'rxjs';
import {WsMode} from '../../core/service/ws/ws-mode.model';
import {Answer} from '../../core/model/answer';
import {JwtService} from '../../core/service/jwt.service';
import {Category} from '../../core/model/category';
import {User} from '../../core/model/user';
import {Round} from '../../core/model/round';
import {Question} from '../../core/model/question';

@Injectable({
  providedIn: 'root'
})
export class ProcessConsumer {

  private userProcesses: BehaviorSubject<Process[]> = new BehaviorSubject<Process[]>([]);

  constructor(private wsService: WsService, private jwtService: JwtService) {
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

  updateRoundBasicData(processId: number, roundName: string, limitTime: string) {
    this.wsService.publish(`process/rounds/current/basic`, {processId, roundName, limitTime}, WsMode.UPDATE);
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

  closeProcess(processId: number, conclusion: string) {
    this.wsService.publish(`process/finish`, {processId, conclusion}, WsMode.UPDATE);
  }

  updateQuestion(processId: number, questionId: number, name: string, questionTypeName: string,
                 minVal: number, maxVal: number, orderPosition: number) {
    this.wsService.publish(`process/rounds/current/question`, {
      processId,
      questionId,
      questionTypeName,
      name,
      minVal,
      maxVal,
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

  updateQuestionCategories(processId: number, questionId: number, categories: Category, maxSelectable: number) {
    this.wsService.publish(`process/rounds/current/question/categories`, {
      processId,
      questionId,
      categories,
      maxSelectable
    }, WsMode.UPDATE);
  }

  private listenProcessesUpdates() {
    this.jwtService.getJwt().subscribe((jwt) => {
      if (jwt === null || jwt === undefined || jwt === '' || jwt === 'null') {
        return;
      }
      this.wsService.listen('process/all', true, this.userProcesses, (processes: Process[]) => {
        processes.forEach((p1: Process) => {
          if (p1.coordinators) {
            p1.coordinators.sort(this.sortUsers);
          }
          if (p1.experts) {
            p1.experts.sort(this.sortUsers);
          }
          if (p1.currentRound && p1.currentRound.expertsRemaining) {
            p1.currentRound.expertsRemaining.sort(this.sortUsers);
          }
          if (p1.currentRound && p1.currentRound.expertsRemaining) {
            p1.currentRound.expertsVoted.sort(this.sortUsers);
          }
          if (p1.pastRounds) {
            p1.pastRounds.sort((r1: Round, r2: Round) => {
              r1.answers.sort(this.sortAnswers);
              r1.questions.sort(this.sortQuestions);
              r1.expertsVoted.sort(this.sortUsers);
              r1.expertsRemaining.sort(this.sortUsers);

              if (r1.id < r2.id) {
                return 1;
              }
              if (r1.id > r2.id) {
                return -1;
              }
              return 0;
            });
          }
          if (p1.currentRound && p1.currentRound.answers) {
            p1.currentRound.answers.sort(this.sortAnswers);
          }
          if (p1.currentRound && p1.currentRound.questions) {
            p1.currentRound.questions.sort(this.sortQuestions);
          }
        });
        // Order processes
        processes.sort((p1: Process, p2: Process) => {
          if (p1.id < p2.id) {
            return 1;
          }
          if (p1.id > p2.id) {
            return -1;
          }
          return 0;
        });

      });
    });
  }

  private sortUsers(u1: User, u2: User) {
    // sort messages for each chat
    if (!u1) {
      return -1;
    } else if (u2) {
      return 1;
    }
    return u1.name.localeCompare(u2.name);
  }


  private sortQuestions(q1: Question, q2: Question) {
    if (q1.id < q2.id) {
      return 1;
    }
    if (q1.id > q2.id) {
      return -1;
    }
    return 0;
  }

  private sortAnswers(a1: Answer, a2: Answer) {
    if (a1.id < a2.id) {
      return 1;
    }
    if (a1.id > a2.id) {
      return -1;
    }
    return 0;
  }
}

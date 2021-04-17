import {Component, OnInit, ViewChild} from '@angular/core';
import {IonContent, IonInfiniteScroll, IonReorderGroup} from '@ionic/angular';
import {Process} from '../process';
import {User} from '../../user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Question} from '../question';
import {QuestionType} from '../question-type';
import {ItemReorderEventDetail} from '@ionic/core';
import {Round} from '../round';

@Component({
  selector: 'delphi-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  QuestionType = QuestionType;
  expertsFiltered: User[] = [];
  process: Process;
  filterCriterial: string = '';

  @ViewChild(IonContent, {read: IonContent, static: false}) createProcess: IonContent;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
    this.resetProcess();
  }

  async filterExperts() {
    if (this.filterCriterial === '' || this.filterCriterial === null) {
      return;
    }
    const users = await this.httpClient.get<User[]>(environment.apiUrl + '/v1/process/filter/expert?criteria=' + this.filterCriterial).toPromise();
    this.expertsFiltered = users.filter((expert: User) => {
      return !this.process.experts.find((pExpert: User) => {
        return pExpert.id === expert.id;
      });
    });
  }

  async addRound() {
    const round = new Round();
    round.name = 'Ronda ' + (this.process.rounds.length + 1);
    round.finishTime = new Date();
    round.questions = [];
    this.process.rounds.push(round);
    await this.createProcess.scrollToBottom(300);
  }
  async addQuestion(round: Round) {
    const roundIndex = this.process.rounds.findIndex((iRound: Round) => {
      return iRound.id === round.id;
    });
    const question = new Question();
    question.name = 'Pregunta ' + (this.process.rounds[roundIndex].questions.length + 1);
    this.process.rounds[roundIndex].questions.push(question);
    await this.createProcess.scrollToBottom(300);
  }

  expandedQuestion: Question;

  expandQuestion(question: Question) {
    this.expandedQuestion = question;
    if (this.expandedQuestion.type === null) {
      this.expandedQuestion.type = QuestionType.QUALITATIVE;
    }
  }

  compressQuestion(round: Round) {
    const roundIndex = this.process.rounds.findIndex((iRound: Round) => {
      return iRound.id === round.id;
    });
    this.process.rounds[roundIndex].questions.find((question: Question) => {
      return question.id === this.expandedQuestion.id;
    });
    this.expandedQuestion = null;
  }

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  pushExpert(expert: User) {
    if (this.process.experts.find((pExpert: User) => {
      return pExpert.id === expert.id;
    })) {
      return;
    }
    this.expertsFiltered = this.expertsFiltered.filter((pExpert: User) => {
      return pExpert.id !== expert.id;
    });
    this.process.experts.push(expert);
    this.filterCriterial = '';
  }

  removeExpert(expert: User) {
    this.process.experts = this.process.experts.filter((pExpert: User) => {
      return pExpert.id !== expert.id;
    });
  }

  resetProcess() {
    this.process = new Process();
  }

}

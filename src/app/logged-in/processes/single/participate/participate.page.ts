import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {Process} from '../../../../core/model/process';
import {User} from '../../../../core/model/user';
import {IonSlides, LoadingController, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Answer} from '../../../../core/model/answer';
import {TranslateService} from '@ngx-translate/core';
import {UserConsumer} from '../../../user.consumer';
import {ProcessConsumer} from '../../process.consumer';
import {Round} from '../../../../core/model/round';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';
import {NotificationService} from '../../../../core/service/notification.service';
import {FormBuilder} from '@angular/forms';
import {QuestionKindService} from '../../../../core/question-kind-service';

@Component({
  selector: 'delphi-participate',
  templateUrl: './participate.page.html',
  styleUrls: ['./participate.page.scss'],
})
export class ParticipatePage implements AfterViewInit, OnDestroy {
  answers: Answer[];
  idx;
  answerQuestion: any;
  answerUpdater: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);


  process: Process;
  currentUser: User;
  @ViewChild('participate') participateSlides: IonSlides;
  userSubscription: Subscription;
  processSubscription: Subscription;
  answerFormSubscription: Subscription;
  viewOnly: boolean;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public qks: QuestionKindService,
    private ns: NotificationService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private userConsumer: UserConsumer,
    private processConsumer: ProcessConsumer) {
  }

  swipeNext() {
    if (this.participateSlides) {
      this.participateSlides.slideNext().then(null);
    }
  }

  ngAfterViewInit(): void {
    this.route.params.subscribe(
      params => {
        if (this.answerFormSubscription && !this.answerFormSubscription.closed) {
          this.answerFormSubscription.unsubscribe();
        }
        if (this.userSubscription && !this.userSubscription.closed) {
          this.userSubscription.unsubscribe();
        }
        if (this.processSubscription && !this.processSubscription.closed) {
          this.processSubscription.unsubscribe();
        }
        this.process = undefined;
        this.currentUser = undefined;
        this.answers = undefined;
        this.idx = undefined;
        this.fillAnswers();

        this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
          if (user === null) {
            return;
          }
          this.currentUser = user;
          this.fillAnswers();
        });

        this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
          if (processes == null) {
            return;
          }
          this.process = processes.find(p2 => p2.id === +params.id);
          if (this.process === undefined) {
            return;
          }
          if (this.answerFormSubscription && !this.answerFormSubscription.closed) {
            this.answerFormSubscription.unsubscribe();
          }
          if (!this.process.currentRound.questions || this.process.currentRound.questions.length === 0) {
            this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(null);
          }
          this.fillAnswers();
        });
      });
  }

  setViewOnly() {
    if (this.process && this.process.currentRound && (this.process.currentRound.id === undefined || !this.process.currentRound.started)) {
      this.viewOnly = true;
    } else {
      this.viewOnly = false;
    }
  }

  fillAnswers() {
    if (!this.process || !this.process.currentRound || !this.process.currentRound.questions) {
      return;
    }
    this.setViewOnly();
    this.orderQuestions();
    this.sortCategories(0);
    this.answers = [];
    this.idx = 0;
    this.process.currentRound.questions.forEach((q, idx) => {
      const a = new Answer();
      a.question = q;
      a.user = this.currentUser;
      a.content = this.getPreviousParticipation(q.id);
      this.answers[idx] = a;
    });
    this.updateValView();
  }


  updateValView() {
    console.log('update val view, ', this.process)
    if (!this.answers) {
      return;
    }
    const answer = this.answers[this.idx].content;
    this.answerQuestion = answer;
    this.answerUpdater.next(this.answerQuestion);
  }


  changeVal(val) {
    console.log('NEW VAL RECEIVED!!', val);
    this.answerQuestion = val;
  }

  checkCurrentQuestion() {
    const val = this.answerQuestion;
    console.log('val:', val);
    console.log('viewOnly:', this.viewOnly);
    if ((val === null || val === undefined || val === -1 || val === ''
      || (typeof val === 'string' && val.trim().length === 0)) && !this.viewOnly) {
      this.ns.showToast('Por favor responde la pregunta.');
      return false;
    }
    return true;
  }

  advance() {
    if (!this.checkCurrentQuestion()) {
      return;
    }
    this.sortCategories(this.idx - 1);

    this.participateSlides.slideNext().then(() => {
      ++this.idx;
      this.updateValView();
    });
  }

  back() {
    if (!this.checkCurrentQuestion()) {
      return;
    }
    this.sortCategories(this.idx - 1);

    this.participateSlides.slidePrev().then(() => {
      --this.idx;

      this.updateValView();
    });
  }

  finish() {
    if (!this.checkCurrentQuestion()) {
      return;
    }
    this.idx++;
    this.ns.showAlert('Confirmar participación', '¿Estás seguro de que deseas enviar la participación?', {
        text: 'Enviar',
        handler: () => {
          this.ns.removeAlert();
          this.saveParticipation();
        }
      },
      {
        text: 'Cancelar',
        cssClass: 'secondary',
        handler: () => {
          this.idx = this.process.currentRound.questions.length - 1;
          this.ns.removeAlert();
        }
      });
  }

  getExpertAnswer(expert: User, round: Round, qId: number): Answer {
    if (round.answers === null || round.answers === undefined) {
      return null;
    }
    return round.answers.find(rr => rr.user.id === expert.id && rr.question.id === qId);
  }

  sortCategories(idx) {
    if (!this.process || !this.process.currentRound
      || !this.process.currentRound.questions || idx === undefined
      || !this.process.currentRound.questions[idx]
      || !this.process.currentRound.questions[idx].categories
      || this.process.currentRound.questions[idx].categories.length <= 0) {
      return;
    }
    this.process.currentRound.questions[idx].categories.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }

  addCatAnswer($event) {
    if (Array.isArray($event.target.value)) {
      if ($event.target.value.length > this.answers[this.idx].question.maxSelectable) {
        $event.target.value = '';
        this.ns.showToast('Debes seleccionar menos del máximo de seleccionables para esta ronda: ' +
          this.answers[this.idx].question.maxSelectable);
        return;
      }
      // TODO  this.answers[currentQuestion].content = JSON.stringify($event.target.value);
    } else {
      // TODO this.answers[currentQuestion].content = 'cat_id:' + $event.target.value;
    }
  }

  addCatPondAnswer($event, categoryId) {
    let obj = {};
    try {
      obj = JSON.parse(this.answers[this.idx].content);
    } catch (e) {
      obj = {};
    }
    obj[categoryId] = $event.target.value;
    // TODO  this.answers[currentQuestion].content = JSON.stringify(obj);
  }

  ngOnDestroy(): void {
    if (this.answerFormSubscription && !this.answerFormSubscription.closed) {
      this.answerFormSubscription.unsubscribe();
    }
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (this.processSubscription && !this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    this.process = undefined;
    this.currentUser = undefined;
    this.answers = undefined;
    this.idx = undefined;
  }

  private getPreviousParticipation(qId: number) {
    if (!this.currentUser || !this.process || !this.process.currentRound || !this.process.currentRound.answers) {
      return;
    }
    const res = this.process.currentRound.answers
      .find(rr => {
        if (rr.user.id
          === this.currentUser.id
          && rr.question.id === qId) {
          return rr.content;
        }
        return null;
      });
    if (res) {
      return res.content;
    } else {
      return null;
    }
  }

  private orderQuestions() {
    if (!this.process || !this.process.currentRound || !this.process.currentRound.questions) {
      return;
    }
    this.process.currentRound.questions.sort((n1, n2) => {
      if (n1.orderPosition < n2.orderPosition) {
        return -1;
      }
      if (n1.orderPosition > n2.orderPosition) {
        return 1;
      }
      return 0;
    });
  }

  private saveParticipation() {
    this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000
    }).then((loading) => {
      loading.present().then(() => {
        this.processConsumer.saveParticipation(this.process.id, this.answers);
        loading.dismiss().then(() => {
          this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(null);
        });
      });
    });
  }

}

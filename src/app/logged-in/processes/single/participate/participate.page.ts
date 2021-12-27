import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Process} from '../../../../core/model/process';
import {User} from '../../../../core/model/user';
import {IonSlides, LoadingController, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Answer} from '../../../../core/model/answer';
import {TranslateService} from '@ngx-translate/core';
import {UserConsumer} from '../../../user.consumer';
import {ProcessConsumer} from '../../process.consumer';
import {Round} from '../../../../core/model/round';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../../core/service/notification.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {QuestionKindService} from '../../../../core/question-kind-service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'delphi-participate',
  templateUrl: './participate.page.html',
  styleUrls: ['./participate.page.scss'],
})
export class ParticipatePage implements OnInit, OnDestroy {
  answers: Answer[];
  idx;

  process: Process;
  currentUser: User;
  @ViewChild('participate') participateSlides: IonSlides;
  userSubscription: Subscription;
  processSubscription: Subscription;
  answerFormSubscription: Subscription;
  answerForm: FormGroup;

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
    this.participateSlides.slideNext().then(null);
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
          if (user === null) {
            return;
          }
          this.currentUser = user;
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
          if (this.process.currentRound && this.process.currentRound.id === undefined || !this.process.currentRound.started) {
            this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(this.ngOnDestroy);
          }
          this.answerForm = new FormGroup({
            currentAnswer: new FormControl('')
          });

          this.orderQuestions();
          this.sortCategories(0);
          this.answers = [];

          this.process.currentRound.questions.forEach((q, idx) => {
            const a = new Answer();
            a.question = q;
            a.user = this.currentUser;
            a.content = this.getPreviousParticipation(q.id);
            this.answers[idx] = a;
          });

          this.idx = 0;
          this.updateVal();
          this.answerFormSubscription = this.answerForm.get('currentAnswer').valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged()
          ).subscribe((val) => {
            console.log('new val:!!', val);
            this.answers[this.idx].content = val;
            this.updateVal();
          });
        });
      });
  }

  updateVal() {
    const val = this.answers[this.idx].content;
    if (val === this.answerForm.get('currentAnswer').value) {
      return;
    }
    this.answerForm.get('currentAnswer').setValue(val);
  }


  advance() {
    this.sortCategories(this.idx + 1);
    const val = this.answerForm.get('currentAnswer').value;
    if (val === null || val === undefined || val === -1 || val === '') {
      this.ns.showToast('Por favor responde la pregunta.');
      return;
    }
    this.participateSlides.slideNext().then(() => {
      ++this.idx;
      this.updateVal();
    });
  }

  back() {
    this.sortCategories(this.idx - 1);
    this.participateSlides.slidePrev().then(() => {
      --this.idx;
      this.updateVal();
    });
  }

  finish() {
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
    if (idx === undefined || this.process.currentRound.questions[idx] === undefined
      || this.process.currentRound.questions[idx].categories === undefined
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
    if (!this.answerFormSubscription.closed) {
      this.answerFormSubscription.unsubscribe();
    }
    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (!this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    this.process = undefined;
    this.currentUser = undefined;
    this.answers = undefined;
    this.idx = undefined;
    this.participateSlides.slideTo(0).then(r => null);
  }

  private getPreviousParticipation(qId: number) {
    if (this.currentUser === undefined || this.currentUser === null || this.process === null || this.process === undefined) {
      return;
    }
    return this.process.currentRound.answers.find(rr => rr.user.id === this.currentUser.id && rr.question.id === qId).content;
  }

  private orderQuestions() {
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
          this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(this.ngOnDestroy);
        });
      });
    });
  }

}

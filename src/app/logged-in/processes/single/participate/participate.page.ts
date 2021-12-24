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

@Component({
  selector: 'delphi-participate',
  templateUrl: './participate.page.html',
  styleUrls: ['./participate.page.scss'],
})
export class ParticipatePage implements OnInit, OnDestroy {
  answers: Answer[];

  currentQuestion;
  currentQuestionValue: any;
  process: Process;
  currentUser: User;
  @ViewChild('participate') participateSlides: IonSlides;
  userSubscription: Subscription;
  routeSubscription: Subscription;
  processSubscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private ns: NotificationService,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private userConsumer: UserConsumer,
    private processConsumer: ProcessConsumer) {
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
          const process = processes.find(p2 => p2.id === +params.id);
          if (process.currentRound && process.currentRound.id === undefined || !process.currentRound.started) {
            this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + process.id).then(r => null);
          }
          this.process = process;
          this.orderQuestions();
          this.sortCategories(0);

          this.process.currentRound.questions.forEach((q, idx) => {
            this.answers[idx] = new Answer();
            this.answers[idx].question = q;
            this.answers[idx].user = this.currentUser;
            this.answers[idx].content = this.getPreviousParticipation(q.id);
          });
          this.updateCurrentQuestionValue();
        });
      });
  }

  ngOnDestroy(): void {
    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (!this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    if (!this.routeSubscription.closed) {
      this.routeSubscription.unsubscribe();
    }
    this.process = undefined;
    this.currentUser = undefined;
    this.answers = undefined;
    this.currentQuestion = undefined;
    this.currentQuestionValue = undefined;
    this.participateSlides.slideTo(0).then(r => null);
  }

  updateCurrentQuestionValue() {
    this.currentQuestionValue = this.answers[this.currentQuestion].content;
  }

  advance() {
    this.sortCategories(this.currentQuestion + 1);
    const val = this.answers[this.currentQuestion].content;
    if (val === null || val === undefined || val === -1 || val === '') {
      this.ns.showToast('Por favor responde la pregunta.');
      return;
    }
    this.currentQuestion++;
    this.updateCurrentQuestionValue();
    this.participateSlides.slideNext();
  }

  back() {
    this.sortCategories(this.currentQuestion - 1);
    this.currentQuestion--;
    this.updateCurrentQuestionValue();
    this.participateSlides.slidePrev();
  }

  finish() {
    this.currentQuestion++;
    this.ns.showAlert('Confirmar participación', '¿Estás seguro de que deseas enviar la participación?', {
      text: 'Cancelar',
      cssClass: 'secondary',
      handler: () => {
        this.currentQuestion = this.process.currentRound.questions.length - 1;
        this.updateCurrentQuestionValue();
        this.ns.removeAlert();
      }
    }, {
      text: 'Enviar',
      handler: () => {
        this.ns.removeAlert();
        this.saveParticipation();
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

  updateAnswer(currentQuestion, $event) {
    this.answers[currentQuestion].content = $event.target.value;
  }

  addCatAnswer(currentQuestion, $event) {
    if (Array.isArray($event.target.value)) {
      if ($event.target.value.length > this.answers[currentQuestion].question.maxSelectable) {
        $event.target.value = '';
        this.ns.showToast('Debes seleccionar menos del máximo de seleccionables para esta ronda: ' +
          this.answers[currentQuestion].question.maxSelectable);
        return;
      }
      // TODO  this.answers[currentQuestion].content = JSON.stringify($event.target.value);
    } else {
      // TODO this.answers[currentQuestion].content = 'cat_id:' + $event.target.value;
    }
  }

  addCatPondAnswer(currentQuestion, $event, categoryId) {
    let obj = {};
    try {
      obj = JSON.parse(this.answers[currentQuestion].content);
    } catch (e) {
      obj = {};
    }
    obj[categoryId] = $event.target.value;
    // TODO  this.answers[currentQuestion].content = JSON.stringify(obj);
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
          this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
        });
      });
    });
  }

}

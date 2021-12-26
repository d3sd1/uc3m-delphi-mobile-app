import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {UserConsumer} from '../../../../user.consumer';
import {ProcessConsumer} from '../../../process.consumer';
import {Subscription} from 'rxjs';
import {NotificationService} from '../../../../../core/service/notification.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './current-round.page.html',
  styleUrls: ['./current-round.page.scss'],
})
export class CurrentRoundPage implements OnInit, OnDestroy {

  process: Process;
  user: User;
  currentTime;
  userSubscription: Subscription;
  processSubscription: Subscription;
  curentRoundFormSubscription: Subscription;

  currentRound = new FormGroup({
    limitTime: new FormControl(''),
    name: new FormControl(''),
  });

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public ns: NotificationService,
    public userConsumer: UserConsumer,
    public processConsumer: ProcessConsumer) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
          if (user === null) {
            return;
          }
          this.user = user;
        });
        this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
          if (processes == null || processes.length === 0) {
            return;
          }
          this.process = processes.find(p2 => p2.id === +params.id);
          if (this.process.currentRound.limitTime !== this.currentRound.get('limitTime').value) {
            this.currentRound.get('limitTime').setValue(this.process.currentRound.limitTime);
          }
          if (this.process.currentRound.name !== this.currentRound.get('name').value) {
            this.currentRound.get('name').setValue(this.process.currentRound.name);
          }
          this.curentRoundFormSubscription = this.currentRound.valueChanges.subscribe((formVals: any) => {
            console.log('value changed:', formVals.limitTime);
            this.updateBasicData(formVals.limitTime, formVals.name);
          });
          this.orderQuestions();
        });
        this.currentTime = (new Date()).toISOString();
      });
  }


  isCoordinator(): boolean {
    if (!this.user || !this.process) {
      return false;
    }
    return this.process.coordinators.findIndex((user) => user.id === this.user.id) !== -1;
  }

  public onItemReorder({detail}) {
    detail.complete(true);
    if (this.process.currentRound.questions[detail.to] === undefined) {
      return;
    }
    this.processConsumer.reorderQuestion(this.process.id, this.process.currentRound.questions[detail.from].id,
      detail.from, this.process.currentRound.questions[detail.to].id, detail.to);
  }

  deleteQuestion(questionIndex: number) {
    this.process.currentRound.questions.splice(questionIndex, 1);
  }

  updateBasicData(limitTime: string, name: string) {
    this.processConsumer.updateRoundBasicData(this.process.id, name, limitTime);
  }

  startRound() {
    if (!this.process.currentRound.name || this.process.currentRound.name === '' || this.process.currentRound.name.length > 40) {

    }
    let questionsMissing = false;
    this.process.currentRound.questions.forEach((question) => {
      if (question.name === null ||
        question.name === '' ||
        question.name === undefined) {
        questionsMissing = true;
      }
    });
    if (this.process.currentRound.limitTime === null ||
      this.process.currentRound.limitTime === undefined) {
      this.ns.showAlert('Error', 'No se pudo enviar la ronda', 'Resolver', null,
        null, 'Debes asignarles una fecha de finalización a la ronda actual.');
    } else if (this.process && (this.process.currentRound.questions === null ||
      this.process.currentRound.questions === undefined ||
      this.process.currentRound.questions.length === 0)) {
      this.ns.showAlert('Error', 'No se pudo enviar la ronda', 'Resolver', null,
        null, 'Debes asignar preguntas a la ronda actual.');
    } else if (questionsMissing) {
      this.ns.showAlert('Error', 'No se pudo enviar la pregunta', 'Resolver', null,
        null, 'Debe introducir una pregunta en todas ellas.');
    } else if (this.process.currentRound.name === '') {
      this.ns.showAlert('Error', 'No se pudo enviar la ronda', 'Resolver', null,
        null, 'Debes introducir un nombre para la ronda');
    } else {
      this.processConsumer.startCurrentRound(this.process.id);
      this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
    }
  }

  closeRound() {
    this.processConsumer.endCurrentRound(this.process.id);
    this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
  }

  addQuestionStep1() {
    this.ns.showAlert('Crear pregunta', null, {
        text: 'Siguiente',
        handler: (alertData) => {
          this.addQuestionStep2(alertData.question);
          this.ns.removeAlert();
        }
      }, 'Cancelar',
      [
        {
          name: 'question',
          type: 'textarea',
          placeholder: 'Pregunta',
          attributes: {
            maxlength: 5000,
          }
        },
      ], 'Debes introducir un nombre para la ronda');
  }

  addQuestionStep2(name: string) {

    let selectedQuestionType = 'QUALITATIVE';
    this.ns.showAlert('Tipo de pregunta', null, {
        text: 'Crear',
        handler: (alertData) => {
          this.ns.removeAlert();
          this.processConsumer.addQuestion(this.process.id, name, selectedQuestionType);
        }
      }, 'Cancelar',
      [
        {
          type: 'radio',
          label: 'Cualitativa',
          checked: true,
          handler: () => {
            selectedQuestionType = 'QUALITATIVE';
          }
        },
        {
          type: 'radio',
          label: 'Cuantitativa',
          handler: () => {
            selectedQuestionType = 'QUANTITATIVE';
          }
        },
        {
          type: 'radio',
          label: 'Booleana',
          handler: () => {
            selectedQuestionType = 'BOOLTYPE';
          }
        },
        {
          type: 'radio',
          label: 'Categorías',
          handler: () => {
            selectedQuestionType = 'CATCUSTOM';
          }
        },
        {
          type: 'radio',
          label: 'Escala de Likert',
          handler: () => {
            selectedQuestionType = 'CATLIKERT';
          }
        },
        {
          type: 'radio',
          label: 'Selección múltiple',
          handler: () => {
            selectedQuestionType = 'CATMULTI';
          }
        },
        {
          type: 'radio',
          label: 'Categorías ponderadas',
          handler: () => {
            selectedQuestionType = 'CATPOND';
          }
        },
      ]);
  }

  ngOnDestroy(): void {
    if (!this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (!this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    if (!this.curentRoundFormSubscription.closed) {
      this.curentRoundFormSubscription.unsubscribe();
    }
    this.process = undefined;
    this.user = undefined;
    this.currentTime = undefined;
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
}

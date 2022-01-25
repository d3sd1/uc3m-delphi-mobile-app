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
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './current-round.page.html',
  styleUrls: ['./current-round.page.scss'],
})
export class CurrentRoundPage implements OnInit, OnDestroy {

  processes: Process[];
  process: Process;
  user: User;
  currentTime;
  userSubscription: Subscription;
  processSubscription: Subscription;
  curentRoundFormSubscription: Subscription;
  loading: HTMLIonLoadingElement;
  redirect: string;

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
          this.reloadData(params, this.processes, user);
        });
        this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
          this.processes = processes;
          this.reloadData(params, processes, this.user);
        });
      });
  }

  reloadData(params, processes, user) {
    if (processes == null || processes.length === 0) {
      return;
    }
    this.process = processes.find(p2 => p2.id === +params.id);
    if (this.loading && this.redirect) {
      this.loading.dismiss().then(() => this.navCtrl.navigateBack(this.redirect).then(null));
    } else if (this.loading) {
      this.loading.dismiss().then(null);
    }
    if (this.process.currentRound.started || this.process.finished || !this.isCoordinator(user)) {
      this.currentRound.get('limitTime').disable();
      this.currentRound.get('name').disable();
    } else {
      this.currentRound.get('limitTime').enable();
      this.currentRound.get('name').enable();
    }

    if (this.curentRoundFormSubscription && !this.curentRoundFormSubscription.closed) {
      this.curentRoundFormSubscription.unsubscribe();
    }
    if (this.process.currentRound.limitTime !== this.currentRound.get('limitTime').value) {
      this.currentRound.get('limitTime').setValue(this.process.currentRound.limitTime);
    }
    if (this.process.currentRound.name !== this.currentRound.get('name').value) {
      this.currentRound.get('name').setValue(this.process.currentRound.name);
    }
    this.curentRoundFormSubscription = this.currentRound.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe((formVals: any) => {
      if (!formVals.name || formVals.name === ''
        || formVals.name.trim().length === 0) {
        this.ns.showToast('Debes introducir un nombre para la ronda actual.');
        return;
      }
      if (new Date(this.currentRound.get('limitTime').value).getTime() - 3600000 <= Date.now()) {
        this.ns.showToast('La fecha de finalización de la ronda debe permitir la participación durante al menos 1 hora después de la actual.');
        this.currentTime = (new Date((Date.now() + 10800000))).toISOString();
        this.currentRound.get('limitTime').reset(this.currentTime);
        return;
      }
      this.ns.showLoading('Actualizando...', 0).then(l => {
        this.updateBasicData(formVals.limitTime, formVals.name);
        this.loading = l;
      });
    });
  }


  isCoordinator(user = null): boolean {
    if(user === null) {
      user = this.user;
    }
    if (!user || !this.process) {
      return false;
    }
    return this.process.coordinators.findIndex((u) => u.id === user.id) !== -1;
  }

  public onItemReorder({detail}) {
    detail.complete(true);
    if (this.process.currentRound.questions[detail.to] === undefined) {
      return;
    }
    this.ns.showLoading('Reordenando...', 0).then(l => {
      this.loading = l;
      this.processConsumer.reorderQuestion(this.process.id, this.process.currentRound.questions[detail.from].id,
        detail.from, this.process.currentRound.questions[detail.to].id, detail.to);
    });

  }

  deleteQuestion(questionIndex: number) {
    this.process.currentRound.questions.splice(questionIndex, 1);
  }

  updateBasicData(limitTime: string, name: string) {
    this.processConsumer.updateRoundBasicData(this.process.id, name, limitTime);
  }

  startRound() {
    this.ns.showLoading('Abriendo ronda...', 0).then(l => {
      this.processConsumer.startCurrentRound(this.process.id);
      this.redirect = '/logged-in/menu/processes/finished/' + this.process.id;
      this.loading = l;
    });
  }

  closeRound() {
    this.ns.showLoading('Cerrando ronda...', 0).then(l => {
      this.processConsumer.endCurrentRound(this.process.id);
      this.redirect = '/logged-in/menu/processes/finished/' + this.process.id;
      this.loading = l;
    });
  }

  addQuestionStep1() {
    if (this.process && this.process.currentRound && this.process.currentRound.questions && this.process.currentRound.questions.length >= 50) {
      this.ns.showAlert('Error', 'Límite de preguntas alcanzado', null, 'Entendido', null, 'El máximo de preguntas por ronda está limitado a 50.');
      return;
    }
    this.ns.showAlert('Crear pregunta', null, {
        text: 'Siguiente',
        handler: (alertData) => {
          if (!alertData || !alertData.question || alertData.question === ''
            || alertData.question.trim().length === 0) {
            this.ns.showAlert('Error', 'El nombre de la pregunta no puede estar vacío.', 'OK');
            return;
          }
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
          this.ns.showLoading('Añadiendo pregunta...', 0).then(l => {
            this.processConsumer.addQuestion(this.process.id, name, selectedQuestionType);
            this.loading = l;
          });

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
        /*{
          type: 'radio',
          label: 'Categorías ponderadas',
          handler: () => {
            selectedQuestionType = 'CATPOND';
          }
        },*/
      ]);
  }

  ngOnDestroy(): void {
    if (this.userSubscription && !this.userSubscription.closed) {
      this.userSubscription.unsubscribe();
    }
    if (this.processSubscription && !this.processSubscription.closed) {
      this.processSubscription.unsubscribe();
    }
    if (this.curentRoundFormSubscription && !this.curentRoundFormSubscription.closed) {
      this.curentRoundFormSubscription.unsubscribe();
    }
    this.process = undefined;
    this.user = undefined;
    this.currentTime = undefined;
    this.redirect = undefined;
    if (this.loading) {
      this.loading.dismiss().then(null);
    }
    this.loading = undefined;
  }

  startRoundConfirmation() {
    let questionsMissing = false;
    this.process.currentRound.questions.forEach((question) => {
      if (question.name === null ||
        question.name === '' ||
        question.name.trim().length === 0 ||
        question.name === undefined) {
        questionsMissing = true;
      }
    });
    if (this.process.currentRound.limitTime === null ||
      this.process.currentRound.limitTime === undefined) {
      this.ns.showAlert('Error', 'No se pudo enviar la ronda', 'Resolver', null,
        null, 'Debes asignarles una fecha de finalización a la ronda actual.');
      return;
    } else if (this.process && (this.process.currentRound.questions === null ||
      this.process.currentRound.questions === undefined ||
      this.process.currentRound.questions.length === 0)) {
      this.ns.showAlert('Error', 'No se pudo enviar la ronda', 'Resolver', null,
        null, 'Debes asignar preguntas a la ronda actual.');
      return;
    } else if (questionsMissing) {
      this.ns.showAlert('Error', 'No se pudo enviar la pregunta', 'Resolver', null,
        null, 'Debe introducir una pregunta en todas ellas.');
      return;
    } else if (this.process.currentRound.name === '' || this.process.currentRound.name.trim().length === 0) {
      this.ns.showAlert('Error', 'No se pudo enviar la ronda', 'Resolver', null,
        null, 'Debes introducir un nombre para la ronda');
      return;
    } else if (this.process.currentRound.questions.some(q =>
      (q.questionType.name === 'CATCUSTOM' && (!q.categories || q.categories.length === 0))
      || (q.questionType.name === 'CATPOND' && (!q.categories || q.categories.length === 0))
      || (q.questionType.name === 'CATMULTI' && (!q.categories || q.categories.length === 0))
    )) {
      this.ns.showAlert('Error', 'No se pudo enviar la ronda', 'Resolver', null,
        null, 'Debes añadir categorías a todas las preguntas de tipo categoría.');
      return;
    } else if (new Date(this.currentRound.get('limitTime').value).getTime() - 3600000 <= Date.now()) {
      this.ns.showAlert('Error', 'No se pudo enviar la ronda', 'Resolver', null,
        null, 'La fecha de finalización de la ronda debe permitir la participación durante al menos 1 hora después de la actual.');
      return;
    }

    this.ns.showAlert('Confirmación', '¿Seguro que deseas abrir la ronda?', {
      text: 'Abrir',
      handler: () => {
        this.ns.removeAlert();
        this.startRound();
      }
    }, 'Cancelar', null, 'Una vez abierta no podrás modificarla.');
  }

  closeRoundConfirmation() {
    this.ns.showAlert('Confirmación', '¿Seguro que deseas cerrar la ronda?', {
      text: 'Cerrar',
      handler: () => {
        this.ns.removeAlert();
        this.closeRound();
      }
    }, 'Cancelar', null, 'Una vez cerrada los expertos no podrán votar.');
  }
}

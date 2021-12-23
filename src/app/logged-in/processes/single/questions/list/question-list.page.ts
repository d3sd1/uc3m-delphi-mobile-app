import {Component, OnDestroy} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserConsumer} from '../../../../user.consumer';
import {ProcessConsumer} from '../../../process.consumer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage implements OnDestroy {

  process: Process;
  user: User;
  currentTime = (new Date()).toISOString();
  userSubscription: Subscription;
  routeSubscription: Subscription;
  processSubscription: Subscription;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public userConsumer: UserConsumer,
    public processConsumer: ProcessConsumer) {
    this.userSubscription = this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
    });
    this.routeSubscription = this.route.params.subscribe(params => {

      this.processSubscription = this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        this.process = processes.find(p2 => p2.id === +params.id);
        this.orderQuestions();
      });
    });
  }


  isCoordinator(): boolean {
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

  async updateBasicData() {
    this.processConsumer.updateRoundBasicData(this.process.id, this.process.currentRound.name, this.process.currentRound.limitTime);
  }

  async startRound() {
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
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        subHeader: 'No se pudo enviar la ronda',
        message: 'Debes asignarles una fecha de finalización a la ronda actual.',
        buttons: ['Resolver']
      });

      await alert.present();
    } else if (this.process && (this.process.currentRound.questions === null ||
      this.process.currentRound.questions === undefined ||
      this.process.currentRound.questions.length === 0)) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        subHeader: 'No se pudo enviar la ronda',
        message: 'Debes asignar preguntas a la ronda actual.',
        buttons: ['Resolver']
      });

      await alert.present();
    } else if (questionsMissing) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        subHeader: 'No se pudo enviar la pregunta',
        message: 'Debe introducir una pregunta en todas ellas.',
        buttons: ['Resolver']
      });

      await alert.present();
    } else if (this.process.currentRound.name === '') {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        subHeader: 'No se pudo comenzar la ronda',
        message: 'Debes introducir un nombre para la ronda',
        buttons: ['Resolver']
      });

      await alert.present();
    } else {
      this.processConsumer.startCurrentRound(this.process.id);
      this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
    }
  }

  async closeRound() {
    this.processConsumer.endCurrentRound(this.process.id);
    this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
  }

  async addQuestionStep1() {
    const alert = await this.alertController.create({
      header: 'Crear pregunta',
      inputs: [
        {
          name: 'question',
          type: 'textarea',
          placeholder: 'Pregunta',
          attributes: {
            maxlength: 5000,
          }
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Siguiente',
          handler: (alertData) => {
            this.addQuestionStep2(alertData.question);
            alert.dismiss();
          }
        }
      ]
    });

    await alert.present();
  }

  async addQuestionStep2(name: string) {
    let selectedQuestionType = 'QUALITATIVE';
    const alert = await this.alertController.create({
      header: 'Tipo de pregunta',
      inputs: [
        {
          type: 'radio',
          label: 'Cualitativa',
          cssClass: 'item-text-wrap',
          checked: true,
          handler: () => {
            selectedQuestionType = 'QUALITATIVE';
          }
        },
        {
          type: 'radio',
          label: 'Cuantitativa',
          cssClass: 'item-text-wrap',
          handler: () => {
            selectedQuestionType = 'QUANTITATIVE';
          }
        },
        {
          type: 'radio',
          label: 'Booleana',
          cssClass: 'item-text-wrap',
          handler: () => {
            selectedQuestionType = 'BOOLTYPE';
          }
        },
        {
          type: 'radio',
          label: 'Categorías',
          cssClass: 'item-text-wrap',
          handler: () => {
            selectedQuestionType = 'CATCUSTOM';
          }
        },
        {
          type: 'radio',
          label: 'Escala de Likert',
          cssClass: 'item-text-wrap',
          handler: () => {
            selectedQuestionType = 'CATLIKERT';
          }
        },
        {
          type: 'radio',
          label: 'Selección múltiple',
          cssClass: 'item-text-wrap',
          handler: () => {
            selectedQuestionType = 'CATMULTI';
          }
        },
        {
          type: 'radio',
          label: 'Categorías ponderadas',
          cssClass: 'item-text-wrap',
          handler: () => {
            selectedQuestionType = 'CATPOND';
          }
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Crear',
          handler: async (alertData) => {
            await alert.dismiss();
            this.processConsumer.addQuestion(this.process.id, name, selectedQuestionType);
          }
        }
      ]
    });

    await alert.present();
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
    this.user = undefined;
    this.currentTime = undefined;
  }
}

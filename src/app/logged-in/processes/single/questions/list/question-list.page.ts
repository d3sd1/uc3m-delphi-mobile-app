import {Component} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserConsumer} from '../../../../../core/consumer/user/user.consumer';
import {ProcessConsumer} from '../../../../../core/consumer/process/process.consumer';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './question-list.page.html',
  styleUrls: ['./question-list.page.scss'],
})
export class QuestionListPage {

  process: Process;
  user: User;
  currentTime = (new Date()).toISOString();

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public alertController: AlertController,
    public userConsumer: UserConsumer,
    public processConsumer: ProcessConsumer,
    private httpClient: HttpClient) {
    this.userConsumer.getUser().subscribe((user) => {
      this.user = user;
    });
    this.route.params.subscribe(params => {
      this.processConsumer.getProcess(+params.id).subscribe((process) => {
        this.process = process;
        this.orderQuestions();
      });
    });
  }


  isCoordinator(): boolean {
    return this.process?.coordinators?.findIndex((user) => user.id === this.user?.id) !== -1;
  }

  private orderQuestions() {
    this.process?.currentRound?.questions?.sort((n1, n2) => {
      if (n1.orderPosition < n2.orderPosition) {
        return -1;
      }
      if (n1.orderPosition > n2.orderPosition) {
        return 1;
      }
      return 0;
    });
  }

  public async onItemReorder({detail}) {
    detail.complete(true);
    if (this.process.currentRound.questions[detail.to] === undefined) {
      return;
    }

    /* TODO sync data
    await this.httpClient.post(environment.apiUrl + '/v1/process/current_round/questions/reorder?process_id=' + this.process.id, {
      fromId: this.process.currentRound.questions[detail.from].id,
      fromPosition: detail.from,
      toId: this.process.currentRound.questions[detail.to].id,
      toPosition: detail.to
    }).toPromise();*/
  }

  sortQuestions() {
    this.process?.currentRound.questions.sort((a, b) => {
      if (a.orderPosition < b.orderPosition) {
        return -1;
      }
      if (a.orderPosition > b.orderPosition) {
        return 1;
      }
      return 0;
    });
  }

  deleteQuestion(questionIndex: number) {
    this.process?.currentRound.questions.splice(questionIndex, 1);
  }

  async updateBasicData() {
    this.processConsumer.updateRoundBasicData(this.process?.id, this.process?.currentRound.name, this.process?.currentRound.limitTime);
  }

  async startRound() {
    let questionsMissing = false;
    this.process?.currentRound.questions?.forEach((question) => {
      if (question.name === null ||
        question.name === '' ||
        question.name === undefined) {
        questionsMissing = true;
      }
    });
    if (this.process?.currentRound?.limitTime === null ||
      this.process?.currentRound?.limitTime === undefined) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        subHeader: 'No se pudo enviar la ronda',
        message: 'Debes asignarles una fecha de finalización a la ronda actual.',
        buttons: ['Resolver']
      });

      await alert.present();
    } else if (this.process?.currentRound.questions === null ||
      this.process?.currentRound.questions === undefined ||
      this.process?.currentRound.questions.length === 0) {
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
    } else if (this.process?.currentRound.name === '') {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        subHeader: 'No se pudo comenzar la ronda',
        message: 'Debes introducir un nombre para la ronda',
        buttons: ['Resolver']
      });

      await alert.present();
    } else {
     // await this.httpClient.post(environment.apiUrl + '/v1/process/round/start?process_id=' + this.process.id, {}).toPromise();
     // await this.navCtrl.navigateBack('/logged-in/menu/processes/single-round/' + this.process.id);
    }
  }

  async closeRound() {
  //  await this.httpClient.post(environment.apiUrl + '/v1/process/round/close?process_id=' + this.process.id, {}).toPromise();
   // await this.navCtrl.navigateBack('/logged-in/menu/processes/single-round/' + this.process.id);
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
            this.processConsumer.addQuestion( this.process?.id, name, selectedQuestionType);
          }
        }
      ]
    });

    await alert.present();
  }

}

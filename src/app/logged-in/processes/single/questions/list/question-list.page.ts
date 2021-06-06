import {Component} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {Round} from '../../../../../core/model/round';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

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
    private httpClient: HttpClient) {
    this.route.snapshot.data['user'].subscribe((user) => {
      this.user = user;
    });
    this.route.snapshot.data['process'].subscribe((process: Process) => {
      if (process.currentRound === undefined || process.currentRound === null) {
        process.currentRound = new Round();
      }
      this.process = process;
    });
  }

  public onItemReorder({detail}) {
    /* if(detail.from > this.process.rounds.length - 1
       || detail.to > this.process.rounds.length - 1) {
       detail.complete(false);
       return;
     }
     const aux = this.process?.rounds[detail.to];
     this.process.rounds[detail.to] = this.process?.rounds[detail.from];
     this.process.rounds[detail.from] = aux;
     this.reAssignOrder();*/
    detail.complete(true);
  }

  sortQuestions() {
    this.process.currentRound.questions.sort((a, b) => {
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
    await this.httpClient.post(environment.apiUrl + '/v1/process/current_round/basic?process_id=' + this.process.id, {
      name: this.process.currentRound.name,
      endTime: this.process.currentRound.endTime
    }).toPromise();
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
    if (this.process?.currentRound.endTime === null ||
      this.process?.currentRound.endTime === undefined) {
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
    } else {
      await this.httpClient.post(environment.apiUrl + '/v1/process/round/start?process_id=' + this.process.id,{}).toPromise();
      await this.navCtrl.navigateBack('/logged-in/menu/processes/single/' + this.process.id);
    }
  }
  async closeRound() {
    await this.httpClient.post(environment.apiUrl + '/v1/process/round/close?process_id=' + this.process.id,{}).toPromise();
    await this.navCtrl.navigateBack('/logged-in/menu/processes/single/' + this.process.id);
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
            await this.httpClient.post(environment.apiUrl + '/v1/process/questions/add?process_id=' + this.process.id, {
              name: name,
              type: selectedQuestionType
            }).toPromise();
          }
        }
      ]
    });

    await alert.present();
  }

}

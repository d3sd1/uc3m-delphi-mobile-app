import {Component} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../../../../core/model/question';
import {QuestionType} from '../../../../../core/model/question-type';
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

  addQuestion() {
    const question = new Question();
    question.type = QuestionType.QUALITATIVE;
    this.process.currentRound.questions.push(
      question
    );
  }

  deleteQuestion(questionIndex: number) {
    this.process?.currentRound.questions.splice(questionIndex, 1);
  }

  async goBack() {
    await this.saveQuestions();
  }

  async updateBasicData() {
    await this.httpClient.post(environment.apiUrl + '/v1/process/current_round/basic?process_id=' + this.process.id, {
      name: this.process.currentRound.name,
      endTime: this.process.currentRound.endTime
    }).toPromise();
  }

  async saveQuestions() {
    let questionsMissing = false;
    this.process?.currentRound.questions?.forEach((question) => {
      if (question.question === null ||
        question.question === '' ||
        question.question === undefined) {
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
      await this.navCtrl.navigateBack('/logged-in/home/menu/processes/modify_rounds');
    }
  }

}

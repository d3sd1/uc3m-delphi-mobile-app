import {Component} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../../../../core/model/question';
import {QuestionType} from '../../../../../core/model/question-type';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './modify-questions.page.html',
  styleUrls: ['./modify-questions.page.scss'],
})
export class ModifyQuestionsPage {

  process: Process;
  user: User;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    public alertController: AlertController) {
    this.route.snapshot.data['user'].subscribe((user) => {
      this.user = user;
    });
    this.route.snapshot.data['process'].subscribe((process) => {
      this.process = process;
    });
  }

  public onItemReorder({detail}) {
    /* if(detail.from > this.process.rounds.length - 1
       || detail.to > this.process.rounds.length - 1) {
       detail.complete(false);
       return;
     }
     detail.complete(true);
     const aux = this.process?.rounds[detail.to];
     this.process.rounds[detail.to] = this.process?.rounds[detail.from];
     this.process.rounds[detail.from] = aux;
     this.reAssignOrder();*/
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
    question.name = 'Pregunta ' + this.process.currentRound.questions.length;
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

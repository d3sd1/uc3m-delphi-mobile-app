import {Component, Input} from '@angular/core';
import {Process} from '../../../../../../core/model/process';
import {HttpClient} from '@angular/common/http';
import {ToastController} from '@ionic/angular';
import {Question} from '../../../../../../core/model/question';

@Component({
  selector: 'delphi-question-quantitative',
  templateUrl: './question-quantitative.page.html',
  styleUrls: ['./question-quantitative.page.scss'],
})
export class QuestionQuantitativePage {
  @Input()
  question: Question;
  @Input()
  process: Process;


  constructor(private httpClient: HttpClient, private toastController: ToastController) {
  }

  async updateQuestion() {
    if (this.question.minVal >= this.question.maxVal) {
      await this.showToast('El valor máximo debe ser mayor que el valor mínimo.');
      return;
    }
    // await this.httpClient.post(environment.apiUrl + '/v1/process/question/update?process_id=' + this.process.id,
    // this.process.currentRound.questions[this.questionIdx]).toPromise();
  }

  private async showToast(msg: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: msg,
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }
}


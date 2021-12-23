import {Component} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../../../../core/model/question';
import {HttpClient} from '@angular/common/http';
import {UserConsumer} from '../../../../user.consumer';
import {ProcessConsumer} from '../../../process.consumer';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './modify-questions-content.page.html',
  styleUrls: ['./modify-questions-content.page.scss'],
})
export class ModifyQuestionsContentPage {

  process: Process;
  currentUser: User;
  question: Question;

  constructor(
    private navCtrl: NavController,
    private userConsumer: UserConsumer,
    private processConsumer: ProcessConsumer,
    private route: ActivatedRoute, private httpClient: HttpClient,
    private toastController: ToastController) {
    this.userConsumer.getUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.route.params.subscribe(params => {

      this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        const process = processes.find(p2 => p2.id === +params.id);
        this.process = process;
        this.question = this.process.currentRound.questions.find(q => q.id === +params['questionid']);
      });
    });
  }


  async updateQuestion() {
    if (this.question.name == '') {
      await this.showToast('Debes introducir una pregunta.');
      return;
    }
    this.processConsumer.updateQuestion(this.process.id, this.question.id,
      this.question.name, this.question.questionType.name, this.question.minVal,
      this.question.maxVal, this.question.maxSelectable, this.question.orderPosition);
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

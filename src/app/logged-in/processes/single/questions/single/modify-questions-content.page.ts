import {Component} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../../../../core/model/question';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserConsumer} from '../../../../../core/consumer/user/user.consumer';
import {ProcessConsumer} from '../../../../../core/consumer/process/process.consumer';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './modify-questions-content.page.html',
  styleUrls: ['./modify-questions-content.page.scss'],
})
export class ModifyQuestionsContentPage {

  process: Process;
  currentUser: User;
  questionIdx: number;

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
      this.processConsumer.getProcess(+params.id).subscribe((process) => {
        this.process = process;
      });
    });
    this.route.params.subscribe(params => {
      // TODO this system may fail if there's another coordinator and edits questions  order
      // fix it ASAP
      this.questionIdx = this.process.currentRound.questions.findIndex(q => q.id === +params['questionid']);
    });
  }


  async updateQuestion() {
    if (this.process.currentRound.questions[this.questionIdx].name == '') {
      await this.showToast('Debes introducir una pregunta.');
      return;
    }
    const q = this.process.currentRound.questions[this.questionIdx];
    console.log('update question yolo!!')
    this.processConsumer.updateQuestion(this.process.id, q.id, q.name, q.category.id, q.minVal, q.maxVal, q.maxSelectable, q.orderPosition);
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

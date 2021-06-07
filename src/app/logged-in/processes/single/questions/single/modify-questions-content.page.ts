import {Component} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {Process} from '../../../../../core/model/process';
import {User} from '../../../../../core/model/user';
import {ActivatedRoute} from '@angular/router';
import {Question} from '../../../../../core/model/question';
import {environment} from '../../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

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
    private route: ActivatedRoute, private httpClient: HttpClient,
    private toastController: ToastController) {
    this.route.snapshot.data['user'].subscribe((user) => {
      this.currentUser = user;
    });
    this.route.snapshot.data['process'].subscribe((process) => {
      this.process = process;
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
    await this.httpClient.post(environment.apiUrl + '/v1/process/question/update?process_id=' + this.process.id,
      this.process.currentRound.questions[this.questionIdx]).toPromise();
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

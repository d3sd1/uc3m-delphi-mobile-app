import {Component, OnInit} from '@angular/core';
import {Process} from '../../process';
import {User} from '../../../user';
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Round} from '../../round';
import {Answer} from '../../answer';
import {Question} from '../../question';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'delphi-participate',
  templateUrl: './participate.page.html',
  styleUrls: ['./participate.page.scss'],
})
export class ParticipatePage implements OnInit {

  process: Process;
  currentUser: User;
  answers: Answer[] = [];

  currentRound: Round;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    public alertController: AlertController,
    private httpClient: HttpClient,
    private toastController: ToastController,
    private translate: TranslateService) {
  }

  async goBack() {
    await this.navCtrl.navigateBack('/logged-in/home/menu/processes/view', {
      state: {process: this.process, currentUser: this.currentUser}
    });
  }
  sortAnswers() {
    this.answers?.sort((a, b) => {
      if (a.question.orderPosition < b.question.orderPosition) {
        return -1;
      }
      if (a.question.orderPosition > b.question.orderPosition) {
        return 1;
      }
      return 0;
    });
  }
  sortCurRoundQuestions() {
    this.currentRound.questions?.sort((a, b) => {
      if (a.orderPosition < b.orderPosition) {
        return -1;
      }
      if (a.orderPosition > b.orderPosition) {
        return 1;
      }
      return 0;
    });
  }
  private async loadProcess() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = this.router.getCurrentNavigation().extras.state.process;
        this.currentUser = this.router.getCurrentNavigation().extras.state.currentUser;
        if (this.process.rounds === undefined) {
          this.process.rounds = [];
        }
        this.findCurrentRound();
        console.log(this.currentRound)
      } else {
        await this.router.navigateByUrl('/logged-in/home/menu/processes');
      }
    });
  }


  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
    this.sortCurRoundQuestions();
    this.currentRound.questions.forEach((question: Question) => {
      const answer = new Answer();
      answer.question = question;
      answer.user = this.currentUser;
      this.answers.push(answer);
    });
    this.sortAnswers();
  }

  public findCurrentRound(): void {
    this.process?.rounds?.forEach((round) => {
      if(round.current) {
        this.currentRound = round;
      }
    });
  }
  public async confirmParticipation() {
    const alert = await this.alertController.create({
      header: 'Confirmar participación',
      message: '¿Estás seguro de que deseas enviar la participación?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: (blah) => {
            alert.dismiss();
          }
        }, {
          text: 'Enviar',
          handler: () => {
            alert.dismiss();
            this.saveParticipation();
          }
        }
      ]
    });

    await alert.present();
  }
  private async showToast(transKey: string) {
    const toast = await this.toastController.create({
      message: await this.translate.get(transKey).toPromise(),
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }
  public async saveParticipation() { // ñapa temporal
    await this.httpClient.post(environment.apiUrl + '/v1/process/tmp_json_upl', this.answers).toPromise().then(async (delphiProcess: Process) => {
      await this.showToast('home.processes.view.round.participate.success');
      if(this.currentRound.expertsVoted === null || this.currentRound.expertsVoted === undefined) {
        this.currentRound.expertsVoted = [];
      }
      this.currentRound.expertsVoted.push(this.currentUser);
      await this.router.navigateByUrl('/logged-in/home/menu/processes/view', {
        state: {
          process: this.process,
          currentUser: this.currentUser
        }
      });
    }).catch(async (errMessage: string) => {
      console.log(errMessage);
      await this.showToast('home.processes.view.round.participate.err');
      await this.router.navigateByUrl('/logged-in/home/menu/processes/view', {
        state: {
          process: this.process,
          currentUser: this.currentUser
        }
      });
    });

  }

}

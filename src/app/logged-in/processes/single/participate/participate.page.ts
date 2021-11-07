import {Component, ViewChild} from '@angular/core';
import {Process} from '../../../../core/model/process';
import {User} from '../../../../core/model/user';
import {AlertController, IonReorderGroup, IonSlides, LoadingController, NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Answer} from '../../../../core/model/answer';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {UserConsumer} from '../../../../core/consumer/user/user.consumer';

@Component({
  selector: 'delphi-participate',
  templateUrl: './participate.page.html',
  styleUrls: ['./participate.page.scss'],
})
export class ParticipatePage {
  answers: Answer[] = [];

  currentQuestion = 0;
  progress = 0;
  process: Process;
  currentUser: User;
  @ViewChild('participate') participateSlides: IonSlides;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private userConsumer: UserConsumer,
    private alertController: AlertController,
    private httpClient: HttpClient) {
   this.userConsumer.getUser().subscribe((user) => {
      this.currentUser = user;
    });
  /* TODO  this.route.snapshot.data['process'].subscribe((process) => {
      if(process.currentRound.id === undefined) {
        router.navigateByUrl('/logged-in/menu/processes/single-round/' + process.id); // In case round closes
      }
      this.process = process;
      this.process.currentRound.questions.forEach((q, idx) => {
        this.answers[idx] = new Answer();
        this.answers[idx].question = q;
        this.answers[idx].user = this.currentUser;
        this.answers[idx].response = '';
      });
      this.orderQuestions();
      this.sortCategories(0);
    });*/
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

  async advance() {
    this.sortCategories(this.currentQuestion + 1);
    const val = this.answers[this.currentQuestion].response;
    if( val === null || val == "null" || val == -1 || val == '') {
      await this.showToast('Por favor responde la pregunta.');
      return;
    }
    this.currentQuestion++;
    this.calculateProgress();
    await this.participateSlides.slideNext();
  }

  async back() {
    this.sortCategories(this.currentQuestion - 1);
    this.currentQuestion--;
    await this.participateSlides.slidePrev();
  }

  private calculateProgress() {
    this.progress = this.currentQuestion/ this.process.currentRound.questions.length;
  }

  async finish() {
    this.progress = 1;
    const alert = await this.alertController.create({
      header: 'Confirmar participación',
      message: '¿Estás seguro de que deseas enviar la participación?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
            this.calculateProgress();
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

  private async saveParticipation() {

    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      duration: 2000
    });
    await loading.present();
    console.log(this.answers)
    await this.httpClient.post(environment.apiUrl + '/v1/process/question/answers?process_id=' + this.process.id, this.answers).toPromise();
    await loading.dismiss();
    await this.router.navigateByUrl('/logged-in/menu/processes/single-round/' + this.process.id); // In case round closes
  }

  sortCategories(idx) {
    this.process.currentRound.questions[idx].categories.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }


  /*
    public async saveParticipation() { // ñapa temporal
      await this.httpClient.post(environment.apiUrl + '/v1/process/tmp_json_upl', this.answers).toPromise().then(async (delphiProcess: Process) => {
        await this.showToast('home.processes.single-round.round.participate.success');
        if (this.process.currentRound.expertsVoted === null || this.process.currentRound.expertsVoted === undefined) {
          this.process.currentRound.expertsVoted = [];
        }
        this.process.currentRound.expertsVoted.push(this.currentUser);
        await this.router.navigateByUrl('/logged-in/home/menu/processes/single-round', {
          state: {
            process: this.process,
            currentUser: this.currentUser
          }
        });
      }).catch(async (errMessage: string) => {
        await this.showToast('home.processes.single-round.round.participate.err');
        await this.router.navigateByUrl('/logged-in/home/menu/processes/single-round', {
          state: {
            process: this.process,
            currentUser: this.currentUser
          }
        });
      });

    }
  */
  private async showToast(transKey: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: transKey,
    });
    await toast.present();
    setTimeout(() => {
      toast.dismiss();
    }, 3000);
    return toast;
  }

  async updateAnswer(currentQuestion, $event) {
    this.answers[currentQuestion].response = $event.target.value;
  }
  async addCatAnswer(currentQuestion, $event) {
    if(Array.isArray($event.target.value)) {
      if($event.target.value.length > this.answers[currentQuestion].question.maxSelectable) {
        $event.target.value = '';
        await this.showToast('Debes seleccionar menos del máximo de seleccionables para esta ronda: ' + this.answers[currentQuestion].question.maxSelectable);
        return;
      }
      this.answers[currentQuestion].response = JSON.stringify($event.target.value);
    } else {
      this.answers[currentQuestion].response = 'cat_id:' + $event.target.value;
    }
  }

  async addCatPondAnswer(currentQuestion, $event, categoryId) {
    let obj = {};
    try {
      obj = JSON.parse(this.answers[currentQuestion].response);
    } catch(e) {
      obj = {};
    }
    obj[categoryId] = $event.target.value;
    this.answers[currentQuestion].response = JSON.stringify(obj);
  }

}

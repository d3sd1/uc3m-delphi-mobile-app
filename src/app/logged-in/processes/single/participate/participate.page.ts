import {Component, ViewChild} from '@angular/core';
import {Process} from '../../../../core/model/process';
import {User} from '../../../../core/model/user';
import {AlertController, IonSlides, LoadingController, NavController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Answer} from '../../../../core/model/answer';
import {TranslateService} from '@ngx-translate/core';
import {UserConsumer} from '../../../../core/consumer/user/user.consumer';
import {ProcessConsumer} from '../../../../core/consumer/process/process.consumer';
import {Round} from '../../../../core/model/round';

@Component({
  selector: 'delphi-participate',
  templateUrl: './participate.page.html',
  styleUrls: ['./participate.page.scss'],
})
export class ParticipatePage {
  answers: Answer[] = [];

  currentQuestion = 0;
  currentQuestionValue: any;
  process: Process;
  currentUser: User;
  @ViewChild('participate') participateSlides: IonSlides;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private translate: TranslateService,
    private loadingCtrl: LoadingController,
    private userConsumer: UserConsumer,
    private processConsumer: ProcessConsumer,
    private alertController: AlertController) {
    this.userConsumer.getUser().subscribe((user) => {
      this.currentUser = user;
    });

    this.route.params.subscribe(params => {
      this.processConsumer.getProcesses().subscribe((processes) => {
        if (processes == null) {
          return;
        }
        const process = processes.find(p2 => p2.id === +params.id);
        if (process.currentRound?.id === undefined || !process.currentRound?.started) {
          this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + process.id).then(r => null);
        }
        this.process = process;
        this.orderQuestions();
        this.sortCategories(0);

        this.process?.currentRound?.questions.forEach((q, idx) => {
          console.log('idx is:', idx)
          this.answers[idx] = new Answer();
          this.answers[idx].question = q;
          this.answers[idx].user = this.currentUser;
          this.answers[idx].content = this.getPreviousParticipation(q.id);
        });
        this.updateCurrentQuestionValue();
      });
    });
  }

  private getPreviousParticipation(qId: number) {
    return this.process?.currentRound?.answers.find(rr => rr.user.id === this.currentUser.id && rr.question.id === qId)?.content;
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

  updateCurrentQuestionValue() {
    this.currentQuestionValue = this.answers[this.currentQuestion].content;
  }

  async advance() {
    this.sortCategories(this.currentQuestion + 1);
    const val = this.answers[this.currentQuestion].content;
    if (val === null || val === undefined || val === -1 || val === '') {
      await this.showToast('Por favor responde la pregunta.');
      return;
    }
    this.currentQuestion++;
    this.updateCurrentQuestionValue();
    await this.participateSlides.slideNext();
  }

  async back() {
    this.sortCategories(this.currentQuestion - 1);
    this.currentQuestion--;
    this.updateCurrentQuestionValue();
    await this.participateSlides.slidePrev();
  }

  async finish() {
    this.currentQuestion++;
    const alert = await this.alertController.create({
      header: 'Confirmar participación',
      message: '¿Estás seguro de que deseas enviar la participación?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
            this.currentQuestion = this.process.currentRound.questions.length - 1;
            this.updateCurrentQuestionValue();
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

  private saveParticipation() {
    this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000
    }).then((loading) => {
      loading.present().then(() => {
        this.processConsumer.saveParticipation(this.process.id, this.answers);
        loading.dismiss().then(() => {
          this.navCtrl.navigateBack('/logged-in/menu/processes/finished/' + this.process.id).then(r => null);
        });
      });
    });
  }

  getExpertAnswer(expert: User, round: Round, qId: number): Answer {
    if (round.answers === null || round.answers === undefined) {
      return null;
    }
    return round.answers.find(rr => rr.user.id === expert.id && rr.question.id === qId);
  }

  sortCategories(idx) {
    this.process?.currentRound?.questions[idx]?.categories?.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }

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
    this.answers[currentQuestion].content = $event.target.value;
  }

  async addCatAnswer(currentQuestion, $event) {
    if (Array.isArray($event.target.value)) {
      if ($event.target.value.length > this.answers[currentQuestion].question.maxSelectable) {
        $event.target.value = '';
        await this.showToast('Debes seleccionar menos del máximo de seleccionables para esta ronda: ' + this.answers[currentQuestion].question.maxSelectable);
        return;
      }
      // TODO  this.answers[currentQuestion].content = JSON.stringify($event.target.value);
    } else {
      // TODO this.answers[currentQuestion].content = 'cat_id:' + $event.target.value;
    }
  }

  async addCatPondAnswer(currentQuestion, $event, categoryId) {
    let obj = {};
    try {
      obj = JSON.parse(this.answers[currentQuestion].content);
    } catch (e) {
      obj = {};
    }
    obj[categoryId] = $event.target.value;
    // TODO  this.answers[currentQuestion].content = JSON.stringify(obj);
  }

}

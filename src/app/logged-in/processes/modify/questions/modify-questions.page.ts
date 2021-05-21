import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {Process} from '../../process';
import {User} from '../../../user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStorage} from '../../../../core/storage/user.storage';
import {Question} from '../../question';
import {QuestionType} from '../../question-type';
import {Round} from '../../round';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './modify-questions.page.html',
  styleUrls: ['./modify-questions.page.scss'],
})
export class ModifyQuestionsPage implements OnInit {

  process: Process;
  roundIndex: number;
  currentUser: User;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private userStorage: UserStorage,
    public alertController: AlertController) {
  }

  private async loadProcess() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = this.router.getCurrentNavigation().extras.state.process;
        this.roundIndex = this.router.getCurrentNavigation().extras.state.roundIndex;
        console.log(this.process);
        if (this.process.rounds === undefined) {
          this.process.rounds = [];
        }
        this.sortQuestions();
      } else {
        await this.router.navigateByUrl('/logged-in/home/menu/processes');
      }
    });
  }
  public onItemReorder({detail}) {
    detail.complete(true);
    const aux = this.process?.rounds[detail.to];
    this.process.rounds[detail.to] = this.process?.rounds[detail.from];
    this.process.rounds[detail.from] = aux;
    this.reAssignOrder();
  }


  reAssignOrder() {
    this.process.rounds.forEach((round: Round, index) => {
      round.orderPosition = index;
    });
  }
  sortQuestions() {
    this.process.rounds[this.roundIndex].questions.sort((a, b) => {
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
    question.name = 'Pregunta ' + this.process.rounds[this.roundIndex].questions.length;
    question.type = QuestionType.QUALITATIVE;
    this.process.rounds[this.roundIndex].questions.push(
      question
    );
    this.reAssignOrder();
  }

  deleteQuestion(questionIndex: number) {
    this.process?.rounds[this.roundIndex]?.questions.splice(questionIndex, 1);
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
    this.currentUser = await this.userStorage.getUser();
  }

  async goBack() {
    await this.saveQuestions();
  }

  async saveQuestions() {
    let questionsMissing = false;
    this.process?.rounds[this.roundIndex].questions.forEach((question) => {
      console.log('question:',question.question)
      if (question.question === null ||
        question.question === '' ||
        question.question === undefined) {
        questionsMissing = true;
      }
    });
    if (this.process?.rounds[this.roundIndex].endTime === null ||
      this.process?.rounds[this.roundIndex].endTime === undefined) {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Error',
        subHeader: 'No se pudo enviar la ronda',
        message: 'Debes asignarles una fecha de finalización a la ronda actual.',
        buttons: ['Resolver']
      });

      await alert.present();
    } else if (this.process?.rounds[this.roundIndex].questions === null ||
      this.process?.rounds[this.roundIndex].questions === undefined ||
      this.process?.rounds[this.roundIndex].questions.length === 0) {
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
      //TODO determine logic to add to it's role (pass role by routing)
      //TODO aqui al editar un proceso que ya tiene uysuarios los borra yt solo añade los nuevos
      // deberia combinar los antiguos y los nuevos, y actualizar roles (sin duplicados)
      await this.router.navigateByUrl('/logged-in/home/menu/processes/modify_rounds', {
        state: {
          process: this.process,
          currentUser: this.currentUser
        }
      });
    }
  }

}

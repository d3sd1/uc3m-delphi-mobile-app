import {Component, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {Process} from '../../process';
import {User} from '../../../user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStorage} from '../../../../core/storage/user.storage';
import {Question} from '../../question';
import {QuestionType} from '../../question-type';

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
    private userStorage: UserStorage) {
  }
  public onItemReorder({ detail }) {
    detail.complete(true);
  }
  private async loadProcess() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = this.router.getCurrentNavigation().extras.state.process;
        this.roundIndex = this.router.getCurrentNavigation().extras.state.roundIndex;
        console.log(this.process)
        if(this.process.rounds === undefined) {
          this.process.rounds = [];
        }
      } else {
        await this.router.navigateByUrl('/logged-in/home/menu/processes');
      }
    });
  }

  addQuestion() {
    this.process.rounds[this.roundIndex].questions.push(
      new Question('Pregunta ' + this.process.rounds[this.roundIndex].questions.length, QuestionType.QUALITATIVE)
    );
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
    this.currentUser = await this.userStorage.getUser();
  }

  goBack() {
    this.navCtrl.back();
  }
  async saveQuestions() {
    //TODO determine logic to add to it's role (pass role by routing)
    //TODO aqui al editar un proceso que ya tiene uysuarios los borra yt solo añade los nuevos
    // deberia combinar los antiguos y los nuevos, y actualizar roles (sin duplicados)
    await this.router.navigateByUrl('/logged-in/home/menu/processes/modify_rounds', {
      state: {
        process: this.process
      }
    });
  }

}

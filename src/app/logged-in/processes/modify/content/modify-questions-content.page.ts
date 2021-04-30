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
  templateUrl: './modify-questions-content.page.html',
  styleUrls: ['./modify-questions-content.page.scss'],
})
export class ModifyQuestionsContentPage implements OnInit {

  process: Process;
  roundIndex: number;
  questionIndex: number;
  currentUser: User;
  categories = [];
  currentCategory = '';

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private userStorage: UserStorage) {
  }

  public onItemReorder({detail}) {
    detail.complete(true);
  }

  addCategory() {
    this.categories.push({name: this.currentCategory});
    this.currentCategory = '';
  }

  private async loadProcess() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = this.router.getCurrentNavigation().extras.state.process;
        this.roundIndex = this.router.getCurrentNavigation().extras.state.roundIndex;
        this.questionIndex = this.router.getCurrentNavigation().extras.state.questionIndex;
      } else {
        await this.router.navigateByUrl('/logged-in/home/menu/processes');
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
    console.log(this.process.rounds[this.roundIndex].questions[this.questionIndex].type);
    this.currentUser = await this.userStorage.getUser();
  }

  goBack() {
    this.navCtrl.back();
  }

  async saveQuestionContent() {
    await this.router.navigateByUrl('/logged-in/home/menu/processes/modify_questions', {
      state: {
        process: this.process,
        roundIndex: this.roundIndex,
        questionIndex: this.questionIndex,
      }
    });
  }

}

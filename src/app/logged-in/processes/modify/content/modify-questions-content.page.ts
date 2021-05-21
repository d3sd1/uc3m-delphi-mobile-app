import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {Process} from '../../process';
import {User} from '../../../user';
import {ActivatedRoute, Router} from '@angular/router';
import {UserStorage} from '../../../../core/storage/user.storage';
import {Question} from '../../question';
import {QuestionType} from '../../question-type';
import {TranslateService} from '@ngx-translate/core';
import {Category} from '../../category';

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
  currentCategory = '';
  responseRange;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private userStorage: UserStorage,
    private toastController: ToastController,
    private translate: TranslateService) {
  }

  public onItemReorder({detail}) {
    detail.complete(true);
  }

  async addCategory() {
    if(this.currentCategory === undefined
    || this.currentCategory === null
    || this.currentCategory === '') {
      await this.showToast('home.processes.single.round.err.category_must_be_filled');
      return;
    }
    if (this.checkDuplicatedCategories(this.currentCategory)) {
      await this.showToast('home.processes.single.round.err.duplicated_categories');
      return;
    }
    this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.categories.push(new Category(this.currentCategory));
    this.currentCategory = '';
  }

  private async loadProcess() {
    this.route.queryParams.subscribe(async params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.process = this.router.getCurrentNavigation().extras.state.process;
        this.roundIndex = this.router.getCurrentNavigation().extras.state.roundIndex;
        this.questionIndex = this.router.getCurrentNavigation().extras.state.questionIndex;
        if (this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.categories === undefined) {
          this.process.rounds[this.roundIndex].questions[this.questionIndex].categories = [];
        }
      } else {
        await this.router.navigateByUrl('/logged-in/home/menu/processes');
      }
    });
  }

  public async ngOnInit(): Promise<void> {
    await this.loadProcess();
    this.currentUser = await this.userStorage.getUser();
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

  async goBack() {
    await this.navCtrl.navigateBack('/logged-in/home/menu/processes/modify_questions', {
      state: {process: this.process, currentUser: this.currentUser, roundIndex: this.roundIndex}
    });
  }

  async saveQuestionContent() {
    if (this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.question === null
      || this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.question === undefined
      || this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.question === '') {
      await this.showToast('home.processes.single.round.err.content');
      return;
    }

    if (this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.minVal
      > this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.maxVal) {
      await this.showToast('home.processes.single.round.err.valsminmax');
      return;
    }
    if (isNaN(this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.minVal)
      || isNaN(this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.maxVal)) {
      await this.showToast('home.processes.single.round.err.valsnotnumbers');
      return;
    }
    if (this.checkDuplicatedCategories()) {
      await this.showToast('home.processes.single.round.err.duplicated_categories');
      return;
    }
    await this.router.navigateByUrl('/logged-in/home/menu/processes/modify_questions', {
      state: {
        process: this.process,
        roundIndex: this.roundIndex,
        questionIndex: this.questionIndex,
      }
    });
  }

  checkDuplicatedCategories(checkWith: string = null) {
    let hasDuplicatedCategories = false;
    this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.categories.forEach((category1, index1) => {
      this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.categories.forEach((category2, index2) => {
        if (category1.catName.toLowerCase() === category2.catName.toLowerCase() && index1 !== index2) {
          hasDuplicatedCategories = true;
        }
      });
      if (checkWith !== null && checkWith.toLowerCase() === category1.catName.toLowerCase()) {
        hasDuplicatedCategories = true;
      }
    });
    return hasDuplicatedCategories;
  }

  delCategory(category) {
    this.process.rounds[this.roundIndex].questions[this.questionIndex].categories = this.process?.rounds[this.roundIndex]?.questions[this.questionIndex]?.categories.filter((cat) => {
      return cat.catName.toLowerCase() != category.name.toLowerCase();
    });
  }

}

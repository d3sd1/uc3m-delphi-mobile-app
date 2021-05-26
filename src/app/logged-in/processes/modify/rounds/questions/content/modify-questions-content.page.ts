import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from '@ionic/angular';
import {Process} from '../../../../process';
import {User} from '../../../../../user';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Category} from './category';

@Component({
  selector: 'delphi-rounds',
  templateUrl: './modify-questions-content.page.html',
  styleUrls: ['./modify-questions-content.page.scss'],
})
export class ModifyQuestionsContentPage {

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
    this.process?.currentRound.questions[this.questionIndex]?.categories.push(new Category(this.currentCategory));
    this.currentCategory = '';
  }

  private async showToast(transKey: string) {
    const toast = await this.toastController.create({
      position: 'top',
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
    if (this.process?.currentRound.questions[this.questionIndex]?.question === null
      || this.process?.currentRound.questions[this.questionIndex]?.question === undefined
      || this.process?.currentRound.questions[this.questionIndex]?.question === '') {
      await this.showToast('home.processes.single.round.err.content');
      return;
    }

    if (this.process?.currentRound.questions[this.questionIndex]?.minVal
      > this.process?.currentRound.questions[this.questionIndex]?.maxVal) {
      await this.showToast('home.processes.single.round.err.valsminmax');
      return;
    }
    if (isNaN(this.process?.currentRound.questions[this.questionIndex]?.minVal)
      || isNaN(this.process?.currentRound?.questions[this.questionIndex]?.maxVal)) {
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
    this.process?.currentRound.questions[this.questionIndex]?.categories.forEach((category1, index1) => {
      this.process?.currentRound.questions[this.questionIndex]?.categories.forEach((category2, index2) => {
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
    this.process.currentRound.questions[this.questionIndex].categories = this.process?.currentRound.questions[this.questionIndex]?.categories.filter((cat) => {
      return cat.catName?.toLowerCase() != category.name?.toLowerCase();
    });
  }

}

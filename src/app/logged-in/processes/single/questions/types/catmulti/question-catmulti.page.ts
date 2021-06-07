import {Component, Input} from '@angular/core';
import {Question} from '../../../../../../core/model/question';
import {Category} from '../../../../../../core/model/category';
import {Process} from '../../../../../../core/model/process';

@Component({
  selector: 'delphi-question-catmulti',
  templateUrl: './question-catmulti.page.html',
  styleUrls: ['./question-catmulti.page.scss'],
})
export class QuestionCatmultiPage {
  @Input()
  questionIdx: number;
  @Input()
  process: Process;
  currentCategory = '';
  responseRange = 0;
  addCategory() {
    this.process.currentRound[this.questionIdx].categories.push(new Category(this.currentCategory));
    this.currentCategory = '';
  }
  delCategory(category: Category) {
    this.process.currentRound[this.questionIdx].categories = this.process.currentRound[this.questionIdx].categories.filter((cat) => {
      return category.catName !== cat.catName;
    });
  }
}

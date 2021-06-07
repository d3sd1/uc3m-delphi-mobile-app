import {Component, Input} from '@angular/core';
import {Question} from '../../../../../../core/model/question';
import {Category} from '../../../../../../core/model/category';
import {Process} from '../../../../../../core/model/process';

@Component({
  selector: 'delphi-question-catcustom',
  templateUrl: './question-catcustom.page.html',
  styleUrls: ['./question-catcustom.page.scss'],
})
export class QuestionCatcustomPage {
  @Input()
  question: Question;
  @Input()
  process: Process;
  currentCategory = '';
  addCategory() {
    this.question.categories.push(new Category(this.currentCategory));
    this.currentCategory = '';
  }
  delCategory(category: Category) {
    this.question.categories = this.question.categories.filter((cat) => {
      return category.catName !== cat.catName;
    });
  }
}

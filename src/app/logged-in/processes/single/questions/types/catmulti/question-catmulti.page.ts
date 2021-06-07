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
  question: Question;
  @Input()
  process: Process;
  currentCategory = '';
  responseRange = 0;
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

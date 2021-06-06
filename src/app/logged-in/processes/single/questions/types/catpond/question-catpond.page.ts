import {Component, Input} from '@angular/core';
import {Question} from '../../../../../../core/model/question';
import {Category} from '../../../../../../core/model/category';

@Component({
  selector: 'delphi-question-catpond',
  templateUrl: './question-catpond.page.html',
  styleUrls: ['./question-catpond.page.scss'],
})
export class QuestionCatpondPage {
  @Input()
  question: Question;
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

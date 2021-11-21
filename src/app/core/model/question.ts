import {QuestionType} from './question-type';
import {Category} from './category';

export class Question {
  id: number;
  minVal: number = 0;
  maxVal: number = 10;
  maxSelectable: number = 1;
  name: string;
  questionType: QuestionType = new QuestionType();
  orderPosition: number;
  categories: Category[] = [];
}

import {QuestionType} from './question-type';
import {Category} from './content/category';

export class Question {
  id: number;
  name: string;
  minVal: number = 0;
  maxVal: number = 10;
  question: string;
  type: QuestionType;
  orderPosition: number;
  categories: Category[] = [];
}

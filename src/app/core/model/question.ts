import {QuestionType} from './question-type';
import {Category} from './category';

export class Question {
  id: number;
  minVal: number = 0;
  maxVal: number = 10;
  question: string;
  type: QuestionType;
  orderPosition: number;
  categories: Category[] = [];
}
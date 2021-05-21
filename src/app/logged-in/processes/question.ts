import {User} from '../user';
import {QuestionType} from './question-type';
import {Answer} from './answer';
import {Category} from './category';

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

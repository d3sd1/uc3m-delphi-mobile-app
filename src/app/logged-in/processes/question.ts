import {User} from '../user';
import {QuestionType} from './question-type';

export class Question {
  id: number;
  name: string;
  minVal: number = 0;
  maxVal: number = 10;
  question: string;
  type: QuestionType;

}

import {User} from '../user';
import {QuestionType} from './question-type';
import {Answer} from './answer';

export class Question {
  id: number;
  name: string;
  minVal: number = 0;
  maxVal: number = 10;
  question: string;
  type: QuestionType;

}

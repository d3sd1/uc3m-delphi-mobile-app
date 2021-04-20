import {User} from '../user';
import {QuestionType} from './question-type';

export class Question {
  id: number;
  name: string;
  type: QuestionType;

  constructor(name: string, type: QuestionType) {
    this.name = name;
    this.type = type;
  }
}

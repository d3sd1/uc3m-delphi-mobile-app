import {User} from '../user';
import {QuestionType} from './question-type';
import {Answer} from './answer';

export class Category {
  id: number;
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

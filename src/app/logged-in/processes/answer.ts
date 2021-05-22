import {User} from '../user';
import {Question} from './question';

export class Answer {
  id: number;
  response: any;
  question: Question;
  user: User;
}

import {User} from './user';
import {Question} from './question';

export class Answer {
  id: number;
  content: any;
  question: Question;
  user: User;
}




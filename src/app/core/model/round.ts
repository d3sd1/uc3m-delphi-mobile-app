import {Question} from './question';
import {User} from './user';
import {Answer} from './answer';

export class Round {
  id: number;
  name = '';
  questions: Question[] = [];
  limitTime: Date = new Date();
  finished = false;
  orderPosition: number;
  started = false;
  expertsVoted: User[] = [];
  expertsRemaining: User[] = [];
  answers: Answer[] = [];
}



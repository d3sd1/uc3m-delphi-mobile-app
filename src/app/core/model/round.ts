import {Question} from './question';
import {User} from './user';
import {Answer} from './answer';

export class Round {
  id: number;
  name: string = '';
  questions: Question[] = [];
  endTime: Date;
  finished: boolean = false;
  orderPosition: number;
  started: boolean = false;
  expertsVoted: User[] = [];
  expertsRemaining: User[] = [];
  answers: Answer[] = [];
}



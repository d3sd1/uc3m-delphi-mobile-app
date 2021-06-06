import {Question} from './question';
import {User} from './user';

export class Round {
  id: number;
  name: string = '';
  questions: Question[] = [];
  endTime: Date;
  finished: boolean = false;
  orderPosition: number;
  started: boolean = false;
  expertsVoted: User[] = [];
}



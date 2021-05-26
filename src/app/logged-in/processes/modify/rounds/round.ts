import {Question} from '../questions/question';
import {User} from '../../../user';

export class Round {
  id: number;
  name: string;
  questions: Question[] = [];
  endTime: Date;
  finished: boolean = false;
  orderPosition: number;
  current: boolean = false;
  expertsVoted: User[] = [];
}

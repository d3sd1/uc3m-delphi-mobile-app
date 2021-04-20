import {Question} from './question';

export class Round {
  id: number;
  name: string;
  questions: Question[] = [];
  finishTime: Date;
  finished: boolean;

}

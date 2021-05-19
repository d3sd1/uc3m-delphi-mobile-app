import {Question} from './question';
import {User} from '../user';

export class Round {
  id: number;
  name: string;
  questions: Question[] = [];
  endTime: Date;
  finished: boolean = false;
  orderPosition: number;
  current: boolean = false;
  expertsVoted: User[] = [];


  constructor(name: string, questions: Question[], endTime: Date, finished: boolean) {
    this.name = name;
    this.questions = questions;
    this.endTime = endTime;
    this.finished = finished;
    this.expertsVoted = [];
  }

}

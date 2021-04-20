import {Question} from './question';

export class Round {
  id: number;
  name: string;
  questions: Question[] = [];
  endTime: Date;
  finished: boolean;
  orderPosition: number;


  constructor(name: string, questions: Question[], endTime: Date, finished: boolean) {
    this.name = name;
    this.questions = questions;
    this.endTime = endTime;
    this.finished = finished;
  }

}

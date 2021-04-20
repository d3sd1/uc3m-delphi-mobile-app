import {Question} from './question';

export class Round {
  id: number;
  name: string;
  questions: Question[] = [];
  finishTime: Date;
  finished: boolean;
  order: number;


  constructor(name: string, questions: Question[], finishTime: Date, finished: boolean) {
    this.name = name;
    this.questions = questions;
    this.finishTime = finishTime;
    this.finished = finished;
  }

}

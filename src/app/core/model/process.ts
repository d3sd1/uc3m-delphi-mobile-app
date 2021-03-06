import {Round} from './round';
import {User} from './user';

export class Process {
  id = 0;
  name = '';
  description = '';
  objectives = '';
  pictureUrl = '';
  experts: User[] = [];
  coordinators: User[] = [];
  pastRounds: Round[] = [];
  currentRound: Round = new Round();
  finished = false;
  conclusion = '';
  modifiedDate: Date;
}


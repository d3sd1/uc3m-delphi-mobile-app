import {Round} from './round';
import {User} from './user';

export class Process {
  id: number;
  name: string;
  description: string;
  objectives: string;
  pictureUrl: string;
  experts: User[] = [];
  coordinators: User[] = [];
  rounds: Round[] = [];
  currentRound: Round = new Round();
  finished: boolean;
  finalComment: string;
  modifiedDate: Date;
}

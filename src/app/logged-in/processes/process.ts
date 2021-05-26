import {Round} from './single/rounds/round';
import {User} from '../user';

export class Process {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  experts: User[] = [];
  coordinators: User[] = [];
  pastRounds: Round[] = [];
  currentRound: Round = new Round();
  processFinished: boolean;
  finalComment: string;
  modifiedDate: Date;
}

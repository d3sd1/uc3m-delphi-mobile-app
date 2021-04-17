import {User} from '../user';
import {Question} from './question';
import {Round} from './round';

export class Process {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  endTime: Date;
  experts: User[] = [];
  rounds: Round[] = [];

}

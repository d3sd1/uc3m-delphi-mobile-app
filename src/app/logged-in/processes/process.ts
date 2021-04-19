import {User} from '../user';
import {Round} from './round';

export class Process {
  id: number;
  name: string;
  description: string;
  pictureUrl: SafeUrl;
  endTime: string;
  experts: User[] = [];
  rounds: Round[] = [];
  processFinished: boolean;

}

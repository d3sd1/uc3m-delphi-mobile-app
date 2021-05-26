import {Round} from './modify/rounds/round';
import {User} from '../user';

export class Process {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  experts: User[] = [];
  coordinators: User[] = [];
  rounds: Round[] = [];
  processFinished: boolean;
  finalComment: string;
  modifiedDate: Date;
}

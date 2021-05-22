import {Round} from './round';
import {DelphiProcessUser} from './delphi-process-user';

export class Process {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  processUsers: DelphiProcessUser[] = []; // contains everything
  rounds: Round[] = [];
  processFinished: boolean;
  finalComment: string;
  modifiedDate: Date;
}

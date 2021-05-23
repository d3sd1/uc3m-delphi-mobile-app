import {Round} from './round';

export class Process {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  //TODO processUsers: DelphiProcessUser[] = []; // contains everything
  rounds: Round[] = [];
  processFinished: boolean;
  finalComment: string;
  modifiedDate: Date;
}

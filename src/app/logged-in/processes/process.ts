import {User} from '../user';
import {Round} from './round';
import {SafeUrl} from '@angular/platform-browser';
import {DelphiProcessUser} from './delphi-process-user';
import {Media} from './media';

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

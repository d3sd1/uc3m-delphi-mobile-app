import {User} from '../user';
import {Round} from './round';
import {SafeUrl} from '@angular/platform-browser';
import {DelphiProcessUser} from './delphi-process-user';

export class Process {
  id: number;
  name: string;
  description: string;
  pictureUrl: SafeUrl;
  processUsers: DelphiProcessUser[] = []; // contains everything
  rounds: Round[] = [];
  processFinished: boolean;

}

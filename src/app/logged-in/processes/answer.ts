import {User} from '../user';
import {Round} from './round';
import {SafeUrl} from '@angular/platform-browser';
import {DelphiProcessUser} from './delphi-process-user';
import {Media} from './media';
import {Question} from './question';

export class Answer {
  id: number;
  response: any;
  question: Question;
  user: User;
}

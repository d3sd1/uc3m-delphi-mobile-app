import {User} from '../user';
import {Round} from './round';
import {SafeUrl} from '@angular/platform-browser';
import {Role} from '../role';

export class DelphiProcessUser {
  user: User;
  role: Role;

  constructor(user: User, role: Role) {
    this.user = user;
    this.role = role;
  }
}

import {User} from '../user';
import {Role} from '../role';

export class DelphiProcessUser {
  user: User;
  role: Role;

  constructor(user: User, role: Role) {
    this.user = user;
    this.role = role;
  }
}

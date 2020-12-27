import {User} from '../../logged-in/user';

export class UserLogin {
  id: number;
  user: User;
  creationDate: Date;
  jwt: string;
  enabled: boolean;
}

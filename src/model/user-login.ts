import {User} from './user';

export class UserLogin {
  id: number;
  user: User;
  creationDate: Date;
  jwt: string;
  enabled: boolean;
}
